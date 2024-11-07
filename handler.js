import { nanoid } from "nanoid";
import notes from "./notes.js";

export const addNoteHandler =(request, h) => {
    const { title, tags, body } = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if(isSuccess) {
        const response = h.response({
            status: "Success",
            message: "Note has been successfully added.",
            data: {
                noteId: id
            }
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: "Fail",
        message: "Note failed to be added."
    })
    response.code(500);
    return response;
};

export const getAllNotesHandler = () => ({
    status: "success",
    data: {
        notes
    }
});

export const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const note = notes.filter((n) => n.id === id)[0];

    if(note !== undefined) {
        return {
            status: "Success",
            data: {
                note
            }
        }
    }

    const response = h.response({
        status: "Fail",
        message: "Note isn't found."
    });
    response.code(404);
    return response;
}

export const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    // const { title, tags, body } = request.payload;
    // const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if(index !== -1) {
        notes.splice(index, 1);
        
        const response = h.response({
            status: "Success",
            message: "Notes has been updated"
        });
        response.code(200);
        return response;
    };

    const response = h.response({
        status: "Fail",
        message: "Note isn't found."
    });
    response.code(404);
    return response;
}

export const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if(index !== -1) {
        notes[index] = {
        ...notes[index],
        title,
        tags,
        body,
        updatedAt
        };
        
        const response = h.response({
            status: "Success",
            message: "Notes has been updated"
        });
        response.code(200);
        return response;
    };

    const response = h.response({
        status: "Fail",
        message: "Note isn't found."
    });
    response.code(404);
    return response;
}