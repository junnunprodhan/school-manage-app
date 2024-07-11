use super::schemas::ExamWithClass;
use crate::database::Id;
use crate::error::Result;
use crate::system::TauriApp;
use tauri::State;

#[tauri::command]
pub async fn create_exam(
    state: State<'_, TauriApp>,
    name: &str,
    started: &str,
    class_id: Id,
) -> Result<Id> {
    let admin = state.admin.lock().await;
    let exam_id = super::services::create_exam(
        admin.connection(),
        name,
        started,
        class_id,
        admin.school_id(),
    )
    .await?;

    Ok(exam_id as Id)
}

#[tauri::command]
pub async fn get_exam(state: State<'_, TauriApp>, exam_id: Id) -> Result<ExamWithClass> {
    let admin = state.admin.lock().await;
    let exam = super::services::get_exam(admin.connection(), exam_id).await?;

    Ok(exam)
}

#[tauri::command]
pub async fn get_school_exams(state: State<'_, TauriApp>) -> Result<Vec<ExamWithClass>> {
    let admin = state.admin.lock().await;
    let exams = super::services::get_school_exams(admin.connection(), admin.school_id()).await?;

    Ok(exams)
}

#[tauri::command]
pub async fn get_school_exams_count(state: State<'_, TauriApp>) -> Result<usize> {
    let admin = state.admin.lock().await;
    let exams = super::services::get_school_exams(admin.connection(), admin.school_id()).await?;

    Ok(exams.len())
}

#[tauri::command]
pub async fn get_class_exams(
    state: State<'_, TauriApp>,
    class_id: Id,
) -> Result<Vec<ExamWithClass>> {
    let admin = state.admin.lock().await;
    let exams =
        super::services::get_class_exams(admin.connection(), class_id, admin.school_id()).await?;

    Ok(exams)
}
