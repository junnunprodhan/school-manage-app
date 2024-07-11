use super::schemas::ExamWithClass;
use crate::database::{Connection, Id};
use crate::error::{Error, Result};

/// Create Exam
///
///
pub async fn create_exam(
    connection: &Connection,
    name: &str,
    started: &str,
    class_id: Id,
    school_id: Id,
) -> Result<Id> {
    let exam_id = sqlx::query(
        r#"
        INSERT INTO `exams` (`name`, `started`, `class_id`, `school_id`)
        VALUES (?, ?, ?, ?)
        "#,
    )
    .bind(name)
    .bind(started)
    .bind(class_id)
    .bind(school_id)
    .execute(connection)
    .await
    .map_err(|_| Error::Create {
        name: "create_exam".to_string(),
    })?
    .last_insert_rowid();

    Ok(exam_id as Id)
}

/// Get Exam
///
///
pub async fn get_exam(connection: &Connection, exam_id: Id) -> Result<ExamWithClass> {
    let exam = sqlx::query_as::<_, ExamWithClass>(
        r#"
        SELECT 
            `exams`.*,
            `classes`.`name` as `class_name` 
        FROM `exams`
        LEFT JOIN `classes` ON `classes`.`id` = `exams`.`class_id`
        WHERE `exams`.`id` = ?
        "#,
    )
    .bind(exam_id)
    .fetch_one(connection)
    .await
    .map_err(|_| Error::Get {
        name: "get_exam".to_string(),
    })?;

    Ok(exam)
}

/// Get School Exams
///
///
pub async fn get_school_exams(
    connection: &Connection,
    school_id: Id,
) -> Result<Vec<ExamWithClass>> {
    let exams = sqlx::query_as::<_, ExamWithClass>(
        r#"
        SELECT 
        	`exams`.*,
        	`classes`.`name` as `class_name` 
        FROM `exams`
        LEFT JOIN `classes` ON `classes`.`id` = `exams`.`class_id`
        WHERE (`exams`.`school_id` = ?)
        "#,
    )
    .bind(school_id)
    .fetch_all(connection)
    .await
    .map_err(|_| Error::Gets {
        name: "get_school_exams".to_string(),
    })?;

    Ok(exams)
}

/// Get Class Exams
///
///
pub async fn get_class_exams(
    connection: &Connection,
    class_id: Id,
    school_id: Id,
) -> Result<Vec<ExamWithClass>> {
    let exams = sqlx::query_as::<_, ExamWithClass>(
        r#"
        SELECT 
        	`exams`.*,
        	`classes`.`name` as `class_name` 
        FROM `exams`
        LEFT JOIN `classes` ON `classes`.`id` = `exams`.`class_id`
        WHERE (`exams`.`class_id` = ? AND `exams`.`school_id` = ?)
        "#,
    )
    .bind(class_id)
    .bind(school_id)
    .fetch_all(connection)
    .await
    .map_err(|_| Error::Gets {
        name: "get_class_exams".to_string(),
    })?;

    Ok(exams)
}
