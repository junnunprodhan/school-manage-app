use super::schemas::About;
use crate::database::{Connection, Id};
use crate::error::{Error, Result};

/// Create About
///
///
pub async fn create_about(
    connection: &Connection,
    birth: &str,
    gender: &str,
    address: &str,
    number: &str,
    email: &str,
    password: &str,
) -> Result<Id> {
    let about_id = sqlx::query(
        r#"
        INSERT INTO `abouts` (`birth`, `gender`, `address`, `number`, `email`, `password`)
        VALUES (?, ?, ?, ?, ?, ?)
        "#,
    )
    .bind(birth)
    .bind(gender)
    .bind(address)
    .bind(number)
    .bind(email)
    .bind(password)
    .execute(connection)
    .await
    .map_err(|_| Error::Create {
        name: "create_about".to_string(),
    })?
    .last_insert_rowid();

    Ok(about_id as Id)
}

/// Get About
///
///
pub async fn get_about(connection: &Connection, about_id: Id) -> Result<About> {
    let about = sqlx::query_as::<_, About>(
        r#"
        SELECT `abouts`.* FROM `abouts`
        WHERE `abouts`.`id` = ?
        "#,
    )
    .bind(about_id)
    .fetch_one(connection)
    .await
    .map_err(|_| Error::Get {
        name: "get_about".to_string(),
    })?;

    Ok(about)
}

/// Get About
///
///
pub async fn get_about_by_email(connection: &Connection, email: &str) -> Result<About> {
    let about = sqlx::query_as::<_, About>(
        r#"
        SELECT `abouts`.* FROM `abouts`
        WHERE `abouts`.`email` = ?
        "#,
    )
    .bind(email)
    .fetch_one(connection)
    .await
    .map_err(|_| Error::Get {
        name: "get_about_by_email".to_string(),
    })?;

    Ok(about)
}
