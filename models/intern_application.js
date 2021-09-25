const mongoose = require("mongoose");
const express = require("express");
const { ObjectId } = mongoose.Schema.Types;

const InternApplicationSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    midname: {
        type: String,
        required: true,
    },
    postedBy: {
        type: ObjectId,
        ref: "User",
    },
    mobile: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    college_name: {
        type: String,
        required: true,
    },
    pcoordinato: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    bday: {
        type: Date,
        required: true,
    },
    intrenship_purpose: {
        type: String,
        required: true,
    },
    skills: {
        type: String,
        required: true,
    },
    reffered_by: {
        type: String,
        required: true,
    }
});
mongoose.model("post", postSchema);
