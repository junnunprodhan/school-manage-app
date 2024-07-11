use super::schemas::{StudentAttendence, StudentAttendenceWithStudent};
use crate::database::{Connection, Id};
use crate::error::{Error, Result};
use crate::libs::date::CustomDate;

/// Create Student Attendence
///
///
pub async fn create_student_attendence(
    connection: &Connection,
    present: bool,
    date: &str,
    class_id: Id,
    student_id: Id,
) -> Result<Id> {
    let student_attendence_id = sqlx::query(
        r#"
        INSERT INTO `student_attendences`
        (`present`, `date`, `class_id`, `student_id`)
        VALUES (?, ?, ?, ?);
        "#,
    )
    .bind(present)
    .bind(date)
    .bind(class_id)
    .bind(student_id)
    .execute(connection)
    .await
    .map_err(|_| Error::Create {
        name: "create_student_attendence".to_string(),
    })?
    .last_insert_rowid();

    Ok(student_attendence_id as Id)
}

/// Get Class Attendeces
///
/// Of specific date.
pub async fn get_class_attendences(
    connection: &Connection,
    date: &str,
    class_id: Id,
) -> Result<Vec<StudentAttendenceWithStudent>> {
    let class_attendences = sqlx::query_as::<_, StudentAttendenceWithStudent>(
        r#"
        SELECT 
            `student_attendences`.`present`,
            `students`.`id`,
            `students`.`name`,
            `students`.`img`
        FROM `student_attendences`
        LEFT JOIN `students` ON `students`.`id` = `student_attendences`.`student_id`
        WHERE (`student_attendences`.`class_id` = ? AND `student_attendences`.`date` = ?);
        "#,
    )
    .bind(class_id)
    .bind(date)
    .fetch_all(connection)
    .await
    .map_err(|_| Error::Gets {
        name: "get_class_attendences".to_string(),
    })?;

    Ok(class_attendences)
}

/// Get Student Attendences
///
/// Of specific month.
pub async fn get_student_attendences(
    connection: &Connection,
    month: i32,
    year: i32,
    student_id: Id,
    class_id: Id,
) -> Result<Vec<StudentAttendence>> {
    let date = CustomDate::new(0, month as usize, year as usize);
    let date_regex = format!("{}-{}-__", date.year(), date.pad_month());

    let attendences = sqlx::query_as::<_, StudentAttendence>(
        r#"
        SELECT `student_attendences`.* FROM `student_attendences`
        LEFT JOIN `students` ON `students`.`id` = `student_attendences`.`student_id`
        WHERE (`student_attendences`.`class_id` = ?
            AND `student_attendences`.`student_id` = ?
            AND `student_attendences`.`date` LIKE ?);
        "#,
    )
    .bind(class_id)
    .bind(student_id)
    .bind(date_regex)
    .fetch_all(connection)
    .await
    .map_err(|_| Error::Gets {
        name: "get_student_attendences".to_string(),
    })?;

    Ok(attendences)
}

/// Update Student Attendence
///
///
pub async fn update_student_attendence(
    connection: &Connection,
    present: bool,
    date: &str,
    class_id: Id,
    student_id: Id,
) -> Result<bool> {
    let _student_attendence = sqlx::query(
        r#"
        UPDATE `student_attendences`
		SET `present` = ?
        WHERE (`student_attendences`.`class_id` = ? 
            AND `student_attendences`.`student_id` = ?
            AND `student_attendences`.`date` = ?);
        "#,
    )
    .bind(present)
    .bind(class_id)
    .bind(student_id)
    .bind(date)
    .execute(connection)
    .await
    .map_err(|_| Error::Update {
        name: "get_student_attendences".to_string(),
    })?;

    Ok(true)
}
