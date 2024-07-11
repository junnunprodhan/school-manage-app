use super::super::classes::schemas::Class;
use crate::database::{Connection, Id};
use crate::error::{Error, Result};

/// Add Class To School
///
///
pub async fn add_class_to_school(
    connection: &Connection,
    class_id: Id,
    school_id: Id,
) -> Result<Id> {
    let school_class_id = sqlx::query(
        r#"
        INSERT INTO `school_classes` (`class_id`, `school_id`) VALUES (?, ?)
        "#,
    )
    .bind(class_id)
    .bind(school_id)
    .execute(connection)
    .await
    .map_err(|_| Error::Add {
        name: "ClassToSchool".to_string(),
    })?
    .last_insert_rowid();

    Ok(school_class_id as Id)
}

/// Get School Classes
///
///
pub async fn get_school_classes(connection: &Connection, school_id: Id) -> Result<Vec<Class>> {
    let class = sqlx::query_as::<_, Class>(

        r#"
        SELECT `classes`.* FROM `classes`
        LEFT JOIN `school_classes` ON `school_classes`.`class_id` = `classes`.`id`
        WHERE `school_classes`.`school_id` = ?
        "#,
    )
    .bind(school_id)
    .fetch_all(connection)
    .await
    .map_err(|_| Error::Gets {
        name: "Classes".to_string(),
    })?;

    Ok(class)
}
