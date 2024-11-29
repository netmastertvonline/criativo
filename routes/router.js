const express = require("express")
const router = express.Router()

const Controller = require("../controllers/Controllers")

router.get("/home", Controller.home)
router.get("/search", Controller.search)
router.post("/search", Controller.searchPost)
router.get("/searchEnd", Controller.searchEnd)
router.get("/searchEnd2", Controller.searchEnd2)


module.exports = router
