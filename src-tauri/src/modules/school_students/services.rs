use super::super::students::schemas::Student;
use crate::database::{Connection, Id};
use crate::error::{Error, Result};

/// Add Student To School
///
///
pub async fn add_student_to_school(
    connection: &Connection,
    student_id: Id,
    school_id: Id,
) -> Result<Id> {
    let school_student_id = sqlx::query(
        r#"
        INSERT INTO `school_students` (`student_id`, `school_id`) VALUES (?, ?)
        "#,
    )
    .bind(student_id)
    .bind(school_id)
    .execute(connection)
    .await
    .map_err(|_| Error::Add {
        name: "add_student_to_school".to_string(),
    })?
    .last_insert_rowid();

    Ok(school_student_id as Id)
}

/// Get School Students
///
///
pub async fn get_school_students(connection: &Connection, school_id: Id) -> Result<Vec<Student>> {
    let students = sqlx::query_as::<_,         Student>(
        r#"
        SELECT `students`.* FROM `students`
        LEFT JOIN `school_students` ON `school_students`.`student_id` = `students`.`id`
        WHERE `school_students`.`school_id` = ?
        "#,
    )
    .bind(school_id)
    .fetch_all(connection)
    .await
    .map_err(|_| Error::Gets {
        name: "get_schools_students".to_string(),
    })?;

    Ok(students)
}
