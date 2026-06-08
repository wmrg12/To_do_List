const path = require("path");
const fs = require("fs");

const File = require("../models/file");

function userFilter(req) {
  return { user: req.user.id };
}

exports.file_list = async (req, res) => {
  try {
    const files = await File.find(userFilter(req));
    return res.json({
      metadata: {
        version: "1.0",
        status: 200
      },
      data: files,
      links: {
        self: "/files"
      },
      errors: null
    });
  } catch (error) {
    return res.status(500).json({
      metadata: {
        version: "1.0",
        status: 500
      },
      data: [],
      links: {},
      errors: [
        {
          message: "Error al listar archivos"
        }
      ]
    });
  }
};

exports.file_upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        metadata: {
          version: "1.0",
          status: 400
        },
        data: [],
        links: {
          self: "/files/upload"
        },
        errors: [
          {
            message: "Archivo no enviado"
          }
        ]
      });
    }
    const file = await File.create({
      filename: req.file.originalname,
      path: req.file.path,
      user: req.user.id
    });

    return res.status(201).json({
      metadata: {
        version: "1.0",
        status: 201
      },
      data: file,
      links: {
        self: `/files/${file._id}`,
        download: `/files/${file._id}/download`
      },
      errors: null
    });
  } catch (error) {
    return res.status(500).json({
      metadata: {
        version: "1.0",
        status: 500
      },
      data: [],
      links: {},
      errors: [
        {
          message: "Error al subir archivo"
        }
      ]
    });
  }
};

exports.file_download = async (req, res) => {
  try {
    const file = await File.findOne({
      _id: req.params.id,
      ...userFilter(req)
    });

    if (!file) {
      return res.status(404).json({
        metadata: {
          version: "1.0",
          status: 404
        },
        data: [],
        links: {
          self: "/files"
        },
        errors: [
          {
            message: "Archivo no encontrado"
          }
        ]
      });
    }

    const filePath = path.resolve(file.path);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        metadata: {
          version: "1.0",
          status: 404
        },
        data: [],
        links: {
          self: "/files"
        },
        errors: [
          {
            message: "Archivo no encontrado"
          }
        ]
      });
    }
    return res.download(filePath);
  } catch (error) {
    return res.status(500).json({
      metadata: {
        version: "1.0",
        status: 500
      },
      data: [],
      links: {},
      errors: [
        {
          message: "Error al descargar archivo"
        }
      ]
    });
  }
};

exports.file_delete = async (req, res) => {
  try {
    const file = await File.findOne({
      _id: req.params.id,
      ...userFilter(req)
    });
    if (!file) {
      return res.status(404).json({
        metadata: {
          version: "1.0",
          status: 404
        },
        data: [],
        links: {
          self: "/files"
        },
        errors: [
          {
            message: "Archivo no encontrado"
          }
        ]
      });
    }
    const filePath = path.resolve(file.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    await File.deleteOne({ _id: file._id });
    return res.json({
      metadata: {
        version: "1.0",
        status: 200
      },
      data: [],
      links: {
        self: "/files"
      },
      errors: null
    });
  } catch (error) {
    return res.status(500).json({
      metadata: {
        version: "1.0",
        status: 500
      },
      data: [],
      links: {},
      errors: [
        {
          message: "Error al eliminar archivo"
        }
      ]
    });
  }
};