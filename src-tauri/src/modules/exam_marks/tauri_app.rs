use super::schemas::{ExamMarkWithStudentAndSubject, ExamMarkWithSubject};
use crate::database::Id;
use crate::error::Result;
use crate::system::TauriApp;
use tauri::State;

#[tauri::command]
pub async fn create_exam_mark(
    state: State<'_, TauriApp>,
    objective_mark: i32,
    subjective_mark: i32,
    practical_mark: i32,
    subject_id: Id,
    student_id: Id,
    exam_id: Id,
) -> Result<Id> {
    let admin = state.admin.lock().await;
    let exam_mark_id = super::services::create_exam_mark(
        admin.connection(),
        objective_mark,
        subjective_mark,
        practical_mark,
        subject_id,
        student_id,
        exam_id,
    )
    .await?;

    Ok(exam_mark_id as Id)
}

#[tauri::command]
pub async fn get_exam_mark(
    state: State<'_, TauriApp>,
    exam_mark_id: Id,
) -> Result<ExamMarkWithSubject> {
    let admin = state.admin.lock().await;
    let exam_mark = super::services::get_exam_mark(admin.connection(), exam_mark_id).await?;

    Ok(exam_mark)
}

#[tauri::command]
pub async fn get_student_exam_marks(
    state: State<'_, TauriApp>,
    student_id: Id,
    exam_id: Id,
) -> Result<Vec<ExamMarkWithSubject>> {
    let admin = state.admin.lock().await;
    let exam_marks =
        super::services::get_student_exam_marks(admin.connection(), student_id, exam_id).await?;

    Ok(exam_marks)
}

#[tauri::command]
pub async fn get_class_subject_exam_marks(
    state: State<'_, TauriApp>,
    subject_id: Id,
    exam_id: Id,
) -> Result<Vec<ExamMarkWithStudentAndSubject>> {
    let admin = state.admin.lock().await;
    let exam_marks =
        super::services::get_class_subject_exam_marks(admin.connection(), subject_id, exam_id)
            .await?;

    Ok(exam_marks)
}

#[tauri::command]
pub async fn add_class_subject_exam_marks(
    state: State<'_, TauriApp>,
    marks: Vec<(i32, i32, i32, Id)>,
    subject_id: Id,
    exam_id: Id,
) -> Result<()> {
    let admin = state.admin.lock().await;

    for (objective_mark, subjective_mark, practical_mark, student_id) in marks.into_iter() {
        super::services::create_exam_mark(
            admin.connection(),
            objective_mark,
            subjective_mark,
            practical_mark,
            subject_id,
            student_id,
            exam_id,
        )
        .await?;
    }

    Ok(())
}

#[tauri::command]
pub async fn update_exam_mark(
    state: State<'_, TauriApp>,
    objective_mark: i32,
    subjective_mark: i32,
    practical_mark: i32,
    subject_id: Id,
    student_id: Id,
    exam_id: Id,
) -> Result<bool> {
    let admin = state.admin.lock().await;
    let exam_mark_updated = super::services::update_exam_mark(
        admin.connection(),
        objective_mark,
        subjective_mark,
        practical_mark,
        subject_id,
        student_id,
        exam_id,
    )
    .await?;

    Ok(exam_mark_updated)
}

#[tauri::command]
pub async fn update_class_subject_exam_marks(
    state: State<'_, TauriApp>,
    marks: Vec<(i32, i32, i32, Id)>,
    subject_id: Id,
    exam_id: Id,
) -> Result<bool> {
    let admin = state.admin.lock().await;

    for (objective_mark, subjective_mark, practical_mark, student_id) in marks.into_iter() {
        super::services::update_exam_mark(
            admin.connection(),
            objective_mark,
            subjective_mark,
            practical_mark,
            subject_id,
            student_id,
            exam_id,
        )
        .await?;
    }

    Ok(true)
}

#[tauri::command]
pub async fn is_class_subject_exam_marks_added(
    state: State<'_, TauriApp>,
    subject_id: Id,
    exam_id: Id,
) -> Result<bool> {
    let admin = state.admin.lock().await;
    let exam_marks =
        super::services::get_class_subject_exam_marks(admin.connection(), subject_id, exam_id)
            .await?;

    Ok(exam_marks.len() != 0)
}
