const Quotation = require('../models/Quotation');

exports.createQuotation = async (req, res) => {
  try {
    const { weight, purity, type, goldPrice, estimatedValue } = req.body;

    if (!weight || !purity || !type || !goldPrice || !estimatedValue) {
      return res.status(400).json({
        success: false,
        message: 'Por favor proporcione todos los campos obligatorios'
      });
    }

    const quotation = await Quotation.create({
      user: req.user.id,
      weight,
      purity,
      type,
      goldPrice,
      estimatedValue
    });

    res.status(201).json({
      success: true,
      message: 'Cotización creada exitosamente',
      quotation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear cotización',
      error: error.message
    });
  }
};

exports.getMyQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('user', 'name email');

    res.status(200).json({
      success: true,
      count: quotations.length,
      quotations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener cotizaciones',
      error: error.message
    });
  }
};

exports.getAllQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name email');

    res.status(200).json({
      success: true,
      count: quotations.length,
      quotations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener cotizaciones',
      error: error.message
    });
  }
};

exports.getQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id)
      .populate('user', 'name email');

    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: 'Cotización no encontrada'
      });
    }

    if (quotation.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No tiene permisos para ver esta cotización'
      });
    }

    res.status(200).json({
      success: true,
      quotation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener cotización',
      error: error.message
    });
  }
};

exports.updateQuotation = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    const quotation = await Quotation.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: 'Cotización no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cotización actualizada exitosamente',
      quotation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar cotización',
      error: error.message
    });
  }
};

exports.deleteQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id);

    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: 'Cotización no encontrada'
      });
    }

    if (quotation.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No tiene permisos para eliminar esta cotización'
      });
    }

    await quotation.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Cotización eliminada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar cotización',
      error: error.message
    });
  }
};
