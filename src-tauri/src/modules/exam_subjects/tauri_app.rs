use super::schemas::ExamSubjectWithSubject;
use crate::database::Id;
use crate::error::Result;
use crate::system::TauriApp;
use tauri::State;

#[tauri::command]
pub async fn create_exam_subject(
    state: State<'_, TauriApp>,
    objective_mark: i32,
    subjective_mark: i32,
    practical_mark: i32,
    subject_id: Id,
    exam_id: Id,
) -> Result<Id> {
    let admin = state.admin.lock().await;
    let exam_subject_id = super::services::create_exam_subject(
        admin.connection(),
        objective_mark,
        subjective_mark,
        practical_mark,
        subject_id,
        exam_id,
    )
    .await?;

    Ok(exam_subject_id as Id)
}

#[tauri::command]
pub async fn get_exam_subject(
    state: State<'_, TauriApp>,
    exam_subject_id: Id,
) -> Result<ExamSubjectWithSubject> {
    let admin = state.admin.lock().await;
    let exam_subject =
        super::services::get_exam_subject(admin.connection(), exam_subject_id).await?;

    Ok(exam_subject)
}

#[tauri::command]
pub async fn get_exam_subjects(
    state: State<'_, TauriApp>,
    exam_id: Id,
) -> Result<Vec<ExamSubjectWithSubject>> {
    let admin = state.admin.lock().await;
    let exam_subjects = super::services::get_exam_subjects(admin.connection(), exam_id).await?;

    Ok(exam_subjects)
}

#[tauri::command]
pub async fn add_exam_subjects(
    state: State<'_, TauriApp>,
    subjects: Vec<(i32, i32, i32, Id)>,
    exam_id: Id,
) -> Result<()> {
    let admin = state.admin.lock().await;

    for (objective_mark, subjective_mark, practical_mark, subject_id) in subjects.into_iter() {
        super::services::create_exam_subject(
            admin.connection(),
            objective_mark,
            subjective_mark,
            practical_mark,
            subject_id,
            exam_id,
        )
        .await?;
    }

    Ok(())
}
