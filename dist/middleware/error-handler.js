export default function (err, req, res, next) {
    res.status(500).json({ message: "something went wrong" });
}
