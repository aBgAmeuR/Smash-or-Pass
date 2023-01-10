class InputVerif {
    
  InputVerif(req, res, next) {
    if (req.body == null) next();
    const regex = /[^A-Za-z0-9 .@]+/g;
    Object.entries(req.body).forEach(([key, value]) => {
      if (regex.test(value)) {
        res.status(400).send("Invalid input");
        return;
      }
    });
    next();
  }
}

module.exports = InputVerif;
