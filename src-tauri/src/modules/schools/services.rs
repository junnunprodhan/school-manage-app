use super::schemas::School;
use crate::database::{Connection, Id};
use crate::error::{Error, Result};

/// Create School
///
///
pub async fn create_school(
    connection: &Connection,
    name: &str,
    img: &str,
    about_id: Id,
) -> Result<Id> {
    let school_id = sqlx::query(
        r#"
        INSERT INTO `schools` (`name`, `img`, `about_id`) VALUES (?, ?, ?)
        "#,
    )
    .bind(name)
    .bind(img)
    .bind(about_id)
    .execute(connection)
    .await
    .map_err(|_| Error::Create {
        name: "create_school".to_string(),
    })?
    .last_insert_rowid();

    Ok(school_id as Id)
}

/// Get School
///
///
pub async fn get_school(connection: &Connection, school_id: Id) -> Result<School> {
    let school = sqlx::query_as::<_, School>(
        r#"
        SELECT `schools`.* FROM `schools`
        WHERE `schools`.`id` = ?
        "#,
    )
    .bind(school_id)
    .fetch_one(connection)
    .await
    .map_err(|_| Error::Get {
        name: "get_school".to_string(),
    })?;

    Ok(school)
}

/// Get Schools
///
///
pub async fn get_schools(connection: &Connection) -> Result<Vec<School>> {
    let schools = sqlx::query_as::<_, School>(
        r#"
        SELECT `schools`.* FROM `schools`
        "#,
    )
    .fetch_all(connection)
    .await
    .map_err(|_| Error::Gets {
        name: "get_schools".to_string(),
    })?;

    Ok(schools)
}

/// Get School
///
///
pub async fn get_school_by_about_id(connection: &Connection, about_id: Id) -> Result<School> {
    let school = sqlx::query_as::<_, School>(
        r#"
        SELECT `schools`.* FROM `schools`
        WHERE `schools`.`about_id` = ?
        "#,
    )
    .bind(about_id)
    .fetch_one(connection)
    .await
    .map_err(|_| Error::Get {
        name: "get_school_by_about_id".to_string(),
    })?;

    Ok(school)
}
