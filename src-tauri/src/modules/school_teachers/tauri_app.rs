use super::super::teachers::schemas::Teacher;
use crate::database::Id;
use crate::error::Result;
use crate::system::TauriApp;
use tauri::State;

#[tauri::command]
pub async fn add_teacher_to_school(state: State<'_, TauriApp>, teacher_id: Id) -> Result<Id> {
    let admin = state.admin.lock().await;

    let id =
        super::services::add_teacher_to_school(admin.connection(), teacher_id, admin.school_id())
            .await?;

    Ok(id)
}

#[tauri::command]
pub async fn get_school_teachers(state: State<'_, TauriApp>) -> Result<Vec<Teacher>> {
    let admin = state.admin.lock().await;

    let teachers =
        super::services::get_school_teachers(admin.connection(), admin.school_id()).await?;

    Ok(teachers)
}

#[tauri::command]
pub async fn get_school_teachers_count(state: State<'_, TauriApp>) -> Result<usize> {
    let admin = state.admin.lock().await;

    let teachers =
        super::services::get_school_teachers(admin.connection(), admin.school_id()).await?;

    Ok(teachers.len())
}
