exports = {
    "id": {
        "type": "string",
        "default": "{{id}}"
    },
    "name": {
        "type": "string"
    },
    "password": {
        "type": "string"
    },
    "email": {
        "type": "string",
        "format": "email"
    },
    "status": {
        "type": "string",
        "enum": ["ACTIVE","INACTIVE"]
    },
    "date_now": {
        "type": "string",
        "format": "date"
    },
    "create_at": {
        "type": "string",
        "format": "date-time"
    }
}