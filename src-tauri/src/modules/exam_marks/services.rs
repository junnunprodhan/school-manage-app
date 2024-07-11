use super::schemas::{ExamMarkWithStudentAndSubject, ExamMarkWithSubject};
use crate::database::{Connection, Id};
use crate::error::{Error, Result};

/// Create Exam Subject
///
///
pub async fn create_exam_mark(
    connection: &Connection,
    objective_mark: i32,
    subjective_mark: i32,
    practical_mark: i32,
    subject_id: Id,
    student_id: Id,
    exam_id: Id,
) -> Result<Id> {
    let exam_mark_id = sqlx::query(
        r#"
        INSERT INTO `exam_marks`
          (`objective_mark`, `subjective_mark`, `practical_mark`, `subject_id`, `student_id`, `exam_id`)
        VALUES
          (?, ?, ?, ?, ?, ?);
        "#,
    )
    .bind(objective_mark)
    .bind(subjective_mark)
    .bind(practical_mark)
    .bind(subject_id)
    .bind(student_id)
    .bind(exam_id)
    .execute(connection)
    .await
    .map_err(|_| Error::Create{name: "create_exam_mark".to_string() })?
    .last_insert_rowid();

    Ok(exam_mark_id as Id)
}

/// Get Exam Subject
///
///
pub async fn get_exam_mark(
    connection: &Connection,
    exam_mark_id: Id,
) -> Result<ExamMarkWithSubject> {
    let exam_mark = sqlx::query_as::<_, ExamMarkWithSubject>(
        r#"
        SELECT 
        	`exam_marks`.*,
            `class_subjects`.`name` AS `subject_name`,
        	`class_subjects`.`code` AS `subject_code`
        FROM `exam_marks`
        LEFT JOIN `class_subjects` ON `class_subjects`.`id` = `exam_marks`.`subject_id`
        WHERE (`exam_marks`.`id` = ?);
        "#,
    )
    .bind(exam_mark_id)
    .fetch_one(connection)
    .await
    .map_err(|_| Error::Get {
        name: "get_exam_mark".to_string(),
    })?;

    Ok(exam_mark)
}

/// Get Student Exam Subjects
///
///
pub async fn get_student_exam_marks(
    connection: &Connection,
    student_id: Id,
    exam_id: Id,
) -> Result<Vec<ExamMarkWithSubject>> {
    let exam_marks = sqlx::query_as::<_, ExamMarkWithSubject>(
        r#"
        SELECT 
        	`exam_marks`.*,
            `class_subjects`.`name` AS `subject_name`,
        	`class_subjects`.`code` AS `subject_code`
        FROM `exam_marks`
        LEFT JOIN `class_subjects` ON `class_subjects`.`id` = `exam_marks`.`subject_id`
        WHERE (`exam_marks`.`exam_id` = ? AND `exam_marks`.`student_id` = ?);
        "#,
    )
    .bind(exam_id)
    .bind(student_id)
    .fetch_all(connection)
    .await
    .map_err(|_| Error::Gets {
        name: "get_student_exam_marks".to_string(),
    })?;

    Ok(exam_marks)
}

/// Get Class Subject Exam Marks
///
///
pub async fn get_class_subject_exam_marks(
    connection: &Connection,
    subject_id: Id,
    exam_id: Id,
) -> Result<Vec<ExamMarkWithStudentAndSubject>> {
    let exam_marks = sqlx::query_as::<_, ExamMarkWithStudentAndSubject>(
        r#"
        SELECT 
        	`exam_marks`.*,
            `students`.`name` as `student_name`,
            `students`.`img` as `student_img`,
            `class_subjects`.`name` AS `subject_name`,
        	`class_subjects`.`code` AS `subject_code`
        FROM `exam_marks`
        LEFT JOIN `class_subjects` ON `class_subjects`.`id` = `exam_marks`.`subject_id`
        LEFT JOIN `students` on `exam_marks`.`subject_id` = `students`.`id`
        WHERE (`exam_marks`.`exam_id` = ? AND `exam_marks`.`subject_id` = ?);
        "#,
    )
    .bind(exam_id)
    .bind(subject_id)
    .fetch_all(connection)
    .await
    .map_err(|_| Error::Gets {
        name: "get_class_subject_exam_marks".to_string(),
    })?;

    Ok(exam_marks)
}

pub async fn update_exam_mark(
    connection: &Connection,
    objective_mark: i32,
    subjective_mark: i32,
    practical_mark: i32,
    subject_id: Id,
    student_id: Id,
    exam_id: Id,
) -> Result<bool> {
    let _exam_mark_id = sqlx::query(
        r#"
        UPDATE `exam_marks`
        SET `objective_mark` = ?, `subjective_mark` = ?, `practical_mark` = ?
        WHERE (`exam_marks`.`exam_id` = ?
            AND `exam_marks`.`subject_id` = ?
            AND `exam_marks`.`student_id` = ?);
        "#,
    )
    .bind(objective_mark)
    .bind(subjective_mark)
    .bind(practical_mark)
    .bind(exam_id)
    .bind(subject_id)
    .bind(student_id)
    .execute(connection)
    .await
    .map_err(|_| Error::Update {
        name: "update_exam_mark".to_string(),
    })?;

    Ok(true)
}
