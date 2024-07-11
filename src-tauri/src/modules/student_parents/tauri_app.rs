use super::super::parents::schemas::Parent;
use crate::database::Id;
use crate::error::Result;
use crate::system::TauriApp;
use tauri::State;


#[tauri::command]
pub async fn add_parent_to_student(
    state: State<'_, TauriApp>,
    parent_id: Id,
    student_id: Id,
) -> Result<Id> {
    let admin = state.admin.lock().await;
    let id =
        super::services::add_parent_to_student(admin.connection(), parent_id, student_id).await?;

    Ok(id)
}

#[tauri::command]
pub async fn get_student_parents(
    state: State<'_, TauriApp>,
    student_id: Id,
) -> Result<Vec<Parent>> {
    let admin = state.admin.lock().await;
    let parents = super::services::get_student_parents(admin.connection(), student_id).await?;

    Ok(parents)
}

#[tauri::command]
pub async fn get_student_parents_of_class(
    state: State<'_, TauriApp>,
    class_id: Id,
) -> Result<Vec<Parent>> {
    let admin = state.admin.lock().await;
    let parents = super::services::get_student_parents_of_class(
        admin.connection(),
        class_id,
        admin.school_id(),
    )
    .await?;

    Ok(parents)
}
