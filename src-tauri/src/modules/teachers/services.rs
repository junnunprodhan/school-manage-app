use super::schemas::Teacher;
use crate::database::{Connection, Id};
use crate::error::{Error, Result};

/// Create Teacher
///
/// It's create a instance of teacher.
///
///
pub async fn create_teacher(
    connection: &Connection,
    name: &str,
    img: &str,
    about_id: Id,
) -> Result<Id> {
    let teacher_id = sqlx::query(
        r#"
        INSERT INTO `teachers` (`name`, `img`, `about_id`) VALUES (?, ?, ?)
        "#,
    )
    .bind(name)
    .bind(img)
    .bind(about_id)
    .execute(connection)
    .await
    .map_err(|_| Error::Create {
        name: "Teacher".to_string(),
    })?
    .last_insert_rowid();

    Ok(teacher_id as Id)
}

/// Get Teacher
///
///
pub async fn get_teacher(connection: &Connection, teacher_id: Id) -> Result<Teacher> {
    let teacher = sqlx::query_as::<_, Teacher>(
        r#"
        SELECT `teachers`.* FROM `teachers`
        WHERE `teachers`.`id` = ?
        "#,
    )
    .bind(teacher_id)
    .fetch_one(connection)
    .await
    .map_err(|_| Error::Get {
        name: "Teacher".to_string(),
    })?;

    Ok(teacher)
}

/// Get Teachers
///
///
pub async fn get_teachers(connection: &Connection) -> Result<Vec<Teacher>> {
    let teachers = sqlx::query_as::<_, Teacher>(
        r#"
        SELECT `teachers`.* FROM `teachers`
        "#,
    )
    .fetch_all(connection)
    .await
    .map_err(|_| Error::Gets {
        name: "Teachers".to_string(),
    })?;

    Ok(teachers)
}
