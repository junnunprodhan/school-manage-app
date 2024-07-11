use super::schemas::ClassSubject;
use crate::database::{Connection, Id};
use crate::error::{Error, Result};

/// Create Class Subject
///
///
pub async fn create_class_subject(
    connection: &Connection,
    name: &str,
    code: i32,
    class_id: Id,
) -> Result<Id> {
    let class_subject_id = sqlx::query(
        r#"
        INSERT INTO `class_subjects` (`name`, `code`, `class_id`) VALUES (?, ?, ?)
        "#,
    )
    .bind(name)
    .bind(code)
    .bind(class_id)
    .execute(connection)
    .await
    .map_err(|_| Error::Create {
        name: "create_class_subject".to_string(),
    })?
    .last_insert_rowid();

    Ok(class_subject_id as Id)
}

/// Get Class Subject
///
///
pub async fn get_class_subject(
    connection: &Connection,
    class_subject_id: Id,
) -> Result<ClassSubject> {
    let class_subject = sqlx::query_as::<_, ClassSubject>(
        r#"
        SELECT `class_subjects`.* FROM `class_subjects`
        WHERE (`class_subjects`.`id` = ?)
        "#,
    )
    .bind(class_subject_id)
    .fetch_one(connection)
    .await
    .map_err(|_| Error::Get {
        name: "get_class_subject".to_string(),
    })?;

    Ok(class_subject)
}

/// Get Class Subjects
///
///
pub async fn get_class_subjects(
    connection: &Connection,
    class_id: Id,
) -> Result<Vec<ClassSubject>> {
    let class_subjects = sqlx::query_as::<_, ClassSubject>(
        r#"
        SELECT `class_subjects`.* FROM `class_subjects`
        WHERE (`class_subjects`.`class_id` = ?)
        "#,
    )
    .bind(class_id)
    .fetch_all(connection)
    .await
    .map_err(|_| Error::Gets {
        name: "get_class_subjects".to_string(),
    })?;

    Ok(class_subjects)
}
