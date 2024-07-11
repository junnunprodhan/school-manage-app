use super::super::students::schemas::Student;
use super::schemas::{StudentClass, StudentWithClass};
use crate::database::{Connection, Id};
use crate::error::{Error, Result};

/// Add Student To Class
///
///
pub async fn add_student_to_class(
    connection: &Connection,
    roll: i32,
    section: &str,
    section_roll: i32,
    year: i32,
    student_id: Id,
    class_id: Id,
) -> Result<Id> {
    let class_student_id = sqlx::query(
        r#"
        INSERT INTO `class_students`
        (`roll`, `section`, `section_roll`, `year`, `student_id`, `class_id`)
        VALUES (?, ?, ?, ?, ?, ?)
        "#,
    )
    .bind(roll)
    .bind(section)
    .bind(section_roll)
    .bind(year)
    .bind(student_id)
    .bind(class_id)
    .execute(connection)
    .await
    .map_err(|_| Error::Add {
        name: "add_student_to_class".to_string(),
    })?
    .last_insert_rowid();

    Ok(class_student_id as Id)
}

/// Get Class Students
///
///
pub async fn get_class_students(
    connection: &Connection,
    class_id: Id,
    year: i32,
) -> Result<Vec<Student>> {
    let students = sqlx::query_as::<_, Student>(
        r#"
        SELECT `students`.* FROM `students`
        LEFT JOIN `class_students` ON `class_students`.`student_id` = `students`.`id`
        WHERE (`class_students`.`class_id` = ? AND `class_students`.`year` = ?);
        "#,
    )
    .bind(class_id)
    .bind(year)
    .fetch_all(connection)
    .await
    .map_err(|_| Error::Gets {
        name: "get_class_students".to_string(),
    })?;

    Ok(students)
}

/// Get All Student With Class
///
///
pub async fn get_all_student_with_class(
    connection: &Connection,
    class_id: Id,
    year: i32,
) -> Result<Vec<StudentWithClass>> {
    let students = sqlx::query_as::<_, StudentWithClass>(
        r#"
        SELECT 
            `students`.`id`, `students`.`name`, `students`.`img`,
            `class_students`.`roll`, `class_students`.`section`,
            `class_students`.`section_roll`, `class_students`.`year`,
            `classes`.`name` as `class_name` FROM `students`
        LEFT JOIN `class_students` ON `class_students`.`student_id` = `students`.`id`
        LEFT JOIN `classes` ON `classes`.`id` = `class_students`.`class_id`
        WHERE (`classes`.`id` = ? AND `class_students`.`year` = ?);
        "#,
    )
    .bind(class_id)
    .bind(year)
    .fetch_all(connection)
    .await
    .map_err(|_| Error::Gets {
        name: "get_all_student_with_class".to_string(),
    })?;

    Ok(students)
}

/// Get Student Class
///
///
pub async fn get_student_class(
    connection: &Connection,
    student_id: Id,
    year: i32,
) -> Result<StudentClass> {
    let students = sqlx::query_as::<_, StudentClass>(
        r#"
        SELECT 
        `classes`.`name`, `class_students`.`roll`,
        `class_students`.`section`, `class_students`.`section_roll`,
        `class_students`.`year` FROM `class_students`
        LEFT JOIN `classes` ON `classes`.`id` = `class_students`.`class_id`
        WHERE (`class_students`.`student_id` = ? AND `class_students`.`year` = ?);
        "#,
    )
    .bind(student_id)
    .bind(year)
    .fetch_one(connection)
    .await
    .map_err(|_| Error::Get {
        name: "get_student_class".to_string(),
    })?;

    Ok(students)
}
