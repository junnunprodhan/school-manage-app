use crate::config::Config;
use crate::error::{Error, Result};
use sqlx::{migrate::MigrateDatabase, Pool, Sqlite, SqlitePool};

pub type Connection = Pool<Sqlite>;
pub type Id = i64;
pub type Int = i32;
pub type Text = String;

pub async fn connection() -> Result<Connection> {
    let config = Config::new();

    let is_exists = Sqlite::database_exists(&config.database_filename)
        .await
        .unwrap_or(false);

    if !is_exists {
        Sqlite::create_database(&config.database_filename)
            .await
            .map_err(|_| Error::DatabaseCreate)?;
    }

    if let Ok(connection) = SqlitePool::connect(&config.database_filename).await {
        if !is_exists {
            crate::modules::app::services::create_tables(&connection).await?;
        }

        return Ok(connection);
    }

    Err(Error::DatabaseConnection)
}
