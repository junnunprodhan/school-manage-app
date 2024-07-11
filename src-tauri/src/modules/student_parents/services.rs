use super::super::parents::schemas::Parent;
use crate::database::{Connection, Id};
use crate::error::{Error, Result};

/// Add Parent To Student
///
///
pub async fn add_parent_to_student(
    connection: &Connection,
    parent_id: Id,
    student_id: Id,
) -> Result<Id> {
    let student_parent_id = sqlx::query(
        r#"
        INSERT INTO `student_parents` (`parent_id`, `student_id`) VALUES (?, ?)
        "#,
    )
    .bind(parent_id)
    .bind(student_id)
    .execute(connection)
    .await
    .map_err(|_| Error::Add {
        name: "add_parent_to_student".to_string(),
    })?
    .last_insert_rowid();

    Ok(student_parent_id as Id)
}

/// Get Student Parents
///
///
pub async fn get_student_parents(connection: &Connection, student_id: Id) -> Result<Vec<Parent>> {
    let parents = sqlx::query_as::<_, Parent>(
        r#"
        SELECT `parents`.* FROM `parents`
        LEFT JOIN `student_parents` ON `student_parents`.`parent_id` = `parents`.`id`
        WHERE `student_parents`.`student_id` = ?
        "#,
    )
    .bind(student_id)
    .fetch_all(connection)
    .await
    .map_err(|_| Error::Gets {
        name: "get_students_parents".to_string(),
    })?;

    Ok(parents)
}

pub async fn get_student_parents_of_class(
    connection: &Connection,
    class_id: Id,
    school_id: Id,
) -> Result<Vec<Parent>> {
    let parents = sqlx::query_as::<_, Parent>(
        r#"
        SELECT `parents`.* FROM `parents`
        LEFT JOIN `student_parents` ON `student_parents`.`parent_id` = `parents`.`id`
        LEFT JOIN `class_students` ON `class_students`.`student_id` = `student_parents`.`student_id`
        LEFT JOIN `school_classes` On `school_classes`.`class_id` = `class_students`.`class_id`
        WHERE `school_classes`.`class_id` = ? AND `school_classes`.`school_id` = ?
        "#,
    )
    .bind(class_id)
    .bind(school_id)
    .fetch_all(connection)
    .await
    .map_err(|_| Error::Gets {
        name: "get_student_parents_of_class".to_string(),
    })?;

    Ok(parents)
}
