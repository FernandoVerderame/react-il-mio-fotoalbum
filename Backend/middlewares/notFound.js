const notFound = (req, res, next) => {
    res.status(404).send("This route does not exist.")
}

export default notFound;