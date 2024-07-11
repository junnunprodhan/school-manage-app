use super::schemas::Student;
use crate::database::{Connection, Id};
use crate::error::{Error, Result};

/// Create Student
///
///
pub async fn create_student(
    connection: &Connection,
    name: &str,
    img: &str,
    about_id: Id,
) -> Result<Id> {
    let student_id = sqlx::query(
        r#"
        INSERT INTO `students` (`name`, `img`, `about_id`) VALUES (?, ?, ?)
        "#,
    )
    .bind(name)
    .bind(img)
    .bind(about_id)
    .execute(connection)
    .await
    .map_err(|_| Error::Create {
        name: "create_student".to_string(),
    })?
    .last_insert_rowid();

    Ok(student_id as Id)
}

/// Get Student
///
///
pub async fn get_student(connection: &Connection, student_id: Id) -> Result<Student> {
    let student = sqlx::query_as::<_,         Student>(
        r#"
        SELECT `students`.* FROM `students`
        WHERE `students`.`id` = ?
        "#,
    )
    .bind(student_id)
    .fetch_one(connection)
    .await
    .map_err(|_| Error::Get {
        name: "get_student".to_string(),
    })?;

    Ok(student)
}

/// Get Students
///
///
pub async fn get_students(connection: &Connection) -> Result<Vec<Student>> {
    let students = sqlx::query_as::<_,         Student>(
        r#"
        SELECT `students`.* FROM `students`
        "#,
    )
    .fetch_all(connection)
    .await
    .map_err(|_| Error::Gets {
        name: "get_students".to_string(),
    })?;

    Ok(students)
}
