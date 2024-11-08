import {addNoteHandler, getNoteByIdHandler, getAllNotesHandler, editNoteByIdHandler, deleteNoteByIdHandler} from "./handler.js";

const routes = [
    {
        method: "GET",
        path: "/",
        handler: (request, h) => {
            const response = h.response({
                status: "fail",
                message: "Cant be found"
            })
            console.log("babi");
            response.code(404)
            return response;
        },
    },
    {
        method: "POST",
        path: "/notes",
        handler: addNoteHandler,
    },
    {
        method: "GET",
        path: "/notes",
        handler: getAllNotesHandler
    },
    {
        method: "GET",
        path: "/notes/{id}",
        handler: getNoteByIdHandler
    },
    {
        method: "PUT",
        path: "/notes/{id}",
        handler: editNoteByIdHandler
    },
    {
        method: "DELETE",
        path: "/notes/{id}",
        handler: deleteNoteByIdHandler
    }
];

export default routes;