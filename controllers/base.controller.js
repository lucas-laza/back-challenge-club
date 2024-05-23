class BaseController {
  constructor(model) {
      this.model = model;
  }

  create = async (req, res) => {
      try {
          const document = new this.model(req.body);
          await document.save();
          res.status(201).json(document);
      } catch (error) {
          res.status(400).json({ error: error.message });
      }
  }

  getAll = async (req, res) => {
      try {
          const documents = await this.model.find();
          res.status(200).json(documents);
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  }

  getById = async (req, res) => {
      try {
          const document = await this.model.findById(req.params.id);
          if (!document) {
              return res.status(404).json({ error: 'Document not found' });
          }
          res.status(200).json(document);
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  }

  update = async (req, res) => {
      try {
          const document = await this.model.findByIdAndUpdate(req.params.id, req.body, { new: true });
          if (!document) {
              return res.status(404).json({ error: 'Document not found' });
          }
          res.status(200).json(document);
      } catch (error) {
          res.status(400).json({ error: error.message });
      }
  }

  delete = async (req, res) => {
      try {
          const document = await this.model.findByIdAndDelete(req.params.id);
          if (!document) {
              return res.status(404).json({ error: 'Document not found' });
          }
          res.status(200).json({ message: 'Document deleted successfully' });
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  }
}

module.exports = BaseController;
