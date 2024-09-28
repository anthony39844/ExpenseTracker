
exports.upload_file = async (req, res) => {
    const { file } = req.params;
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await fetch("http://localhost:5000/api/v1/upload_file", {
          method: 'POST',
          body: formData,
        })
        
      } catch (error) {
      }
    transactions = []

    res.status(200).json([]);

}