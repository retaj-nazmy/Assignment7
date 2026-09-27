import mongoose, { Types } from "mongoose";
import { noteModel } from "../../database/model/note.model.js";
import { userModel } from "../../database/model/user.model.js";

export const createNote = async (query, body) => {
  try {
    let { userId } = query;
    let { title, content } = body;

    let user = await userModel.findById(userId);
    if (user) {
      let createdNote = await noteModel.create({ userId, title, content });
      if (createdNote) {
        return { message: "Note created" };
      } else {
        return { message: "something went wrong" };
      }
    } else {
      return { message: "user not found" };
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const updateNote = async (params, query, body) => {
  try {
    let { noteId } = params;
    let { userId } = query;
    let { title, content } = body;

    let note = await noteModel.findById(noteId);
    if (note) {
      if (userId == note.userId) {
        let updatedNote = await noteModel.findByIdAndUpdate(
          noteId,
          { title, content },
          { new: true },
        );
        if (updatedNote) {
          return { message: "note updated successfully", updatedNote };
        } else {
          return { message: "something went wrong" };
        }
      } else {
        return { message: "you are not the owner" };
      }
    } else {
      return { message: "note not found" };
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const replaceNote = async (params, query, body) => {
  try {
    let { noteId } = params;
    let { userId } = query;
    let { title, content } = body;

    let note = await noteModel.findById(noteId);
    if (note) {
      if (userId == note.userId) {
        let updatedNote = await noteModel.findOneAndReplace(
          { _id: noteId },
          { title, content, userId },
          { new: true },
        );
        if (updatedNote) {
          return { updatedNote };
        } else {
          return { message: "something went wrong" };
        }
      } else {
        return { message: "you are not the owner" };
      }
    } else {
      return { message: "note not found" };
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const updateAll = async (body, query) => {
  try {
    let { userId } = query;
    let { title } = body;
    let updatedNotes = await noteModel.updateMany({ userId }, { title });
    if (updatedNotes.matchedCount > 0) {
      return { message: "all notes updated" };
    } else {
      return { message: "something went wrong" };
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteNote = async (params, query) => {
  try {
    let { noteId } = params;
    let { userId } = query;
    let note = await noteModel.findById(noteId);
    if (!note) {
      return { message: "note not found" };
    } else {
      if (userId == note.userId) {
        let deletedNote = await noteModel.findByIdAndDelete(noteId);
        if (deletedNote) {
          return { message: "note deleted successfully", deletedNote };
        } else {
          return { message: "something went wrong" };
        }
      } else {
        return { message: "you are not the owner" };
      }
    }
  } catch (error) {
    log(error.message);
  }
};
export const pagination = async (query) => {
  try {
    let { userId, page, limit } = query;
    let skipValue = (Number(page) - 1) * Number(limit);

    let notes = await noteModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .skip(+skipValue)
      .limit(+limit);
    if (notes.length > 0) {
      return notes;
    } else {
      return { message: "not notes found" };
    }
  } catch (error) {
    log(error.message);
  }
};

export const getById = async (params, query) => {
  try {
    let { id } = params;
    let { userId } = query;

    let note = await noteModel.findById(id);
    if (note) {
      if (userId == note.userId) {
        return note;
      } else {
        return { message: "ypu are not the owner" };
      }
    } else {
      return { message: "not notes found" };
    }
  } catch (error) {
    log(error.message);
  }
};

export const getByContent = async (query) => {
  try {
    let { userId, content } = query;

    let notes = await noteModel.find({ userId });
    if (notes.length > 0) {
      let note = await noteModel.findOne({ content });
      if (note) {
        return note;
      } else {
        return { message: "note not found" };
      }
    } else {
      return { message: "not notes found" };
    }
  } catch (error) {
    log(error.message);
  }
};

export const getWithUser = async (query) => {
  try {
    let { userId } = query;

    let notes = await noteModel
      .find({ userId })
      .select("title userId createdAt")
      .populate("userId", "email-_id");
    if (notes.length > 0) {
      return notes;
    } else {
      return { message: "not notes found" };
    }
  } catch (error) {
    log(error.message);
  }
};

export const getNotesAggregated = async (query) => {
  try {
    let { userId, title } = query;

    let matchStage = {
      userId: new Types.ObjectId(userId),
      title:  title
    };

    let notes = await noteModel.aggregate([
      {
        $match: matchStage,
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          title: 1,
          userId: 1,
          createdAt: 1,
          "user.name": 1,
          "user.email": 1,
        },
      },
    ]);

    if (notes.length > 0) {
      return notes;
    } else {
      return { message: "No note found" };
    }
  } catch (error) {
    return { message: "Server Error", errorDetails: error.message };
  }
};


export const deleteAll = async ( query) => {
  try {
    let { userId } = query;

        let deletedNotes = await noteModel.deleteMany({userId: new Types.ObjectId(userId)});
        if (deletedNotes) {
          return { message: " deleted " };
        } else {
          return { message: "something went wrong" };

  } 
}catch (error) {
    console.log(error.message);
  }
};