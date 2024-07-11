use super::schemas::Parent;
use crate::database::{Connection, Id};
use crate::error::{Error, Result};

/// Create Parent
///
/// Manually add to student.
///
///
pub async fn create_parent(
    connection: &Connection,
    name: &str,
    img: &str,
    profession: &str,
    about_id: Id,
) -> Result<Id> {
    let parent_id = sqlx::query(
        r#"
        INSERT INTO `parents` (`name`, `img`, `profession`, `about_id`) VALUES (?, ?, ?, ?);
        "#,
    )
    .bind(name)
    .bind(img)
    .bind(profession)
    .bind(about_id)
    .execute(connection)
    .await
    .map_err(|_| Error::Create {
        name: "create_parent".to_string(),
    })?
    .last_insert_rowid();

    Ok(parent_id as Id)
}

/// Get Parent
///
///
pub async fn get_parent(connection: &Connection, parent_id: Id) -> Result<Parent> {
    let parent = sqlx::query_as::<_, Parent>(
        r#"
        SELECT `parents`.* FROM `parents`
        WHERE `parents`.`id` = ?
        "#,
    )
    .bind(parent_id)
    .fetch_one(connection)
    .await
    .map_err(|_| Error::Get {
        name: "get_parent".to_string(),
    })?;

    Ok(parent)
}

/// Get Parents
///
///
pub async fn get_parents(connection: &Connection) -> Result<Vec<Parent>> {
    let parents = sqlx::query_as::<_, Parent>(
        r#"
        SELECT `parents`.* FROM `parents`
        "#,
    )
    .fetch_all(connection)
    .await
    .map_err(|_| Error::Gets {
        name: "get_parents".to_string(),
    })?;

    Ok(parents)
}
