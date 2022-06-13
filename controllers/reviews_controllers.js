const express = require('express');
const router = express.Router();
const db = require('../models');

//ROUTES - http://localhost:3000/reviews

// Displays a form for a new review
router.get('/reviews/:id', async (req, res, next) =>{
    const context = {user: {_id: req.params.id}};
    console.log(context)
    // try {
    //     const foundPost = await db.Post.findById(req.params.id).populate('user')
    //     const context = { 
    //         post: foundPost,
    //         user: foundPost.user
    //     };
    //     console.log(context)
        res.render('posts/new.ejs', context);
    // }catch(error){
    //     console.log(error);
    //     req.error = error;
    //     return next();
    // };
});

// Create - POST route 
router.post('/new', async (req,res, next)=>{
    try{
        const newPost = await db.Post.create(req.body);
        const id = req.body.user;
        res.redirect(`/users/profile/${id}`); 
    } catch(err){
        console.log(error);
        req.error = error;
        return next();
    };
});

// Show route
router.get('/:postId', async (req,res, next)=>{
    try {
        const foundPost = await db.Post.findById(req.params.postId).populate('user');
        const context = { 
            post: foundPost,
            user: foundPost.user
        };
        res.render('posts/show.ejs', context);
    }catch(error){
        console.log(error);
        req.error = error;
        return next();
    };
});

// Edit Post link; a form for editing a post
router.get('/edit/:postId', async (req,res, next)=>{
    try {
        const updatedPost = await db.Post.findById(req.params.postId);
        const updatingUser = await db.User.findById(updatedPost.user)
        const context = {
            post: updatedPost,
            user: updatingUser 
        };
        return res.render('posts/edit.ejs', context);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    };
});

// Save Button on the Edit Post Page 
router.put('/edit/:postId', async (req, res, next) => {
    try {
        const updatedPost = await db.Post.findByIdAndUpdate(req.params.postId, req.body);
        const user = await db.User.findById(updatedPost.user);
        return res.redirect(`/users/profile/${user._id}`);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    };
});

// Delete post
router.delete('/:postId', async (req,res, next)=>{
    try {
        const deletedPost = await db.Post.findByIdAndDelete(req.params.postId);
        const user = await db.User.findById(deletedPost.user);
        return res.redirect(`/users/profile/${user._id}`);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    };
});

module.exports = router