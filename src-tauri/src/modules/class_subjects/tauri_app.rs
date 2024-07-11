use super::schemas::ClassSubject;
use crate::database::Id;
use crate::error::Result;
use crate::system::TauriApp;
use tauri::State;

#[tauri::command]
pub async fn create_class_subject(
    state: State<'_, TauriApp>,
    name: &str,
    code: i32,
    class_id: Id,
) -> Result<Id> {
    let admin = state.admin.lock().await;
    let class_subject_id =
        super::services::create_class_subject(admin.connection(), name, code, class_id).await?;

    Ok(class_subject_id)
}

#[tauri::command]
pub async fn get_class_subject(
    state: State<'_, TauriApp>,
    class_subject_id: Id,
) -> Result<ClassSubject> {
    let admin = state.admin.lock().await;
    let class_subject =
        super::services::get_class_subject(admin.connection(), class_subject_id).await?;

    Ok(class_subject)
}

#[tauri::command]
pub async fn get_class_subjects(
    state: State<'_, TauriApp>,
    class_id: Id,
) -> Result<Vec<ClassSubject>> {
    let admin = state.admin.lock().await;
    let class_subjects = super::services::get_class_subjects(admin.connection(), class_id).await?;

    Ok(class_subjects)
}

#[tauri::command]
pub async fn add_class_subjects(
    state: State<'_, TauriApp>,
    subjects: Vec<(&str, i32)>,
    class_id: Id,
) -> Result<()> {
    let admin = state.admin.lock().await;

    for (name, code) in subjects.into_iter() {
        super::services::create_class_subject(admin.connection(), name, code, class_id).await?;
    }

    Ok(())
}
