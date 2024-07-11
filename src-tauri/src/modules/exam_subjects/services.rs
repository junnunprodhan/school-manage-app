use super::schemas::ExamSubjectWithSubject;
use crate::database::{Connection, Id};
use crate::error::{Error, Result};

/// Create Exam Subject
///
///
pub async fn create_exam_subject(
    connection: &Connection,
    objective_mark: i32,
    subjective_mark: i32,
    practical_mark: i32,
    subject_id: Id,
    exam_id: Id,
) -> Result<Id> {
    let exam_subject_id = sqlx::query(
        r#"
        INSERT INTO `exam_subjects` (`objective_mark`, `subjective_mark`, `practical_mark`, `subject_id`, `exam_id`)
        VALUES (?, ?, ?, ?, ?)
        "#,
    )
    .bind(objective_mark)
    .bind(subjective_mark)
    .bind(practical_mark)
    .bind(subject_id)
    .bind(exam_id)
    .execute(connection)
    .await
    .map_err(|_| Error::Create{name: "create_exam_subject".to_string() })?
    .last_insert_rowid();

    Ok(exam_subject_id as Id)
}

/// Get Exam Subject
///
///
pub async fn get_exam_subject(
    connection: &Connection,
    exam_subject_id: Id,
) -> Result<ExamSubjectWithSubject> {
    let exam_subject = sqlx::query_as::<_, ExamSubjectWithSubject>(
        r#"
        SELECT 
        	`exam_subjects`.*,
            `class_subjects`.`name` AS `subject_name`,
            `class_subjects`.`code` AS `subject_code`
        FROM `exam_subjects`
        LEFT JOIN `class_subjects` ON `class_subjects`.`id` = `exam_subjects`.`subject_id`
        WHERE `exam_subjects`.`id` = ?
        "#,
    )
    .bind(exam_subject_id)
    .fetch_one(connection)
    .await
    .map_err(|_| Error::Get {
        name: "get_exam_subject".to_string(),
    })?;

    Ok(exam_subject)
}

/// Get Exam Subjects
///
///
pub async fn get_exam_subjects(
    connection: &Connection,
    exam_id: Id,
) -> Result<Vec<ExamSubjectWithSubject>> {
    let exam_subjects = sqlx::query_as::<_, ExamSubjectWithSubject>(
        r#"
        SELECT 
            `exam_subjects`.*,
            `class_subjects`.`name` AS `subject_name`,
            `class_subjects`.`code` AS `subject_code`
        FROM `exam_subjects`
        LEFT JOIN `class_subjects` ON `class_subjects`.`id` = `exam_subjects`.`subject_id`
        WHERE (`exam_subjects`.`exam_id` = ?)
        "#,
    )
    .bind(exam_id)
    .fetch_all(connection)
    .await
    .map_err(|_| Error::Gets {
        name: "get_exam_subjects".to_string(),
    })?;

    Ok(exam_subjects)
}
