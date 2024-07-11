use super::schemas::Class;
use crate::database::{Connection, Id};
use crate::error::{Error, Result};

/// Create Class
///
/// Manually add to school
pub async fn create_class(connection: &Connection, name: &str) -> Result<Id> {
    let class_id = sqlx::query(
        r#"
        INSERT INTO `classes` (`name`) VALUES (?)
        "#,
    )
    .bind(name)
    .execute(connection)
    .await
    .map_err(|_| Error::Create {
        name: "Class".to_string(),
    })?
    .last_insert_rowid();

    Ok(class_id as Id)
}

/// Get Class
///
///
pub async fn get_class(connection: &Connection, class_id: Id) -> Result<Class> {
    let class = sqlx::query_as::<_, Class>(
        r#"
        SELECT `classes`.* FROM `classes`
        WHERE `classes`.`id` = ?
        "#,
    )
    .bind(class_id)
    .fetch_one(connection)
    .await
    .map_err(|_| Error::Get {
        name: "Class".to_string(),
    })?;

    Ok(class)
}

/// Get Classes
///
///
pub async fn get_classes(connection: &Connection) -> Result<Vec<Class>> {
    let class = sqlx::query_as::<_, Class>(
        r#"
        SELECT `classes`.* FROM `classes`
        "#,
    )
    .fetch_all(connection)
    .await
    .map_err(|_| Error::Gets {
        name: "Classes".to_string(),
    })?;

    Ok(class)
}
