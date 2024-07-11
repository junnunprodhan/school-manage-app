use crate::database::{Connection, Id};

/// System Admin
///
/// Admin controller.
pub struct SystemAdmin {
    connection: Connection,
    school_id: Id,
    version: f32,
}

// region    : --- Constructor
impl SystemAdmin {
    pub fn new(connection: Connection) -> Self {
        Self {
            connection,
            school_id: 0,
            version: 1.0,
        }
    }
}
// endregion : --- Constructor

// region    : --- Property
impl SystemAdmin {
    // pub fn version(&self) -> f32 {
    //     self.version
    // }
    pub fn connection(&self) -> &Connection {
        &self.connection
    }
    pub fn school_id(&self) -> Id {
        self.school_id
    }

    pub fn login(&mut self, school_id: Id) {
        self.school_id = school_id;
    }
    pub fn logout(&mut self) {
        self.school_id = 0;
    }

    pub fn set_version(&mut self, version: f32) {
        self.version = version;
    }
}
