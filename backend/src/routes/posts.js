import express from 'express';
import prisma from '../lib/prisma.js'; // Import Prisma client
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: { username: true, avatarUrl: true },
        },
        comments: {
          include: {
            user: {
              select: { username: true, avatarUrl: true },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create post
router.post('/', auth, async (req, res) => {
  try {
    const { content, imageUrl } = req.body;
    
    const post = await prisma.post.create({
      data: {
        content,
        imageUrl,
        userId: req.userId,
      },
      include: {
        user: {
          select: { username: true, avatarUrl: true },
        },
      },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Like/Unlike post
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const isLiked = await prisma.like.findFirst({
      where: {
        postId: post.id,
        userId: req.userId,
      },
    });

    if (isLiked) {
      // Unlike the post
      await prisma.like.delete({
        where: { id: isLiked.id },
      });
    } else {
      // Like the post
      await prisma.like.create({
        data: {
          postId: post.id,
          userId: req.userId,
        },
      });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add comment
router.post('/:id/comment', auth, async (req, res) => {
  try {
    const { content } = req.body;
    
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        userId: req.userId,
        postId: post.id,
      },
      include: {
        user: {
          select: { username: true, avatarUrl: true },
        },
      },
    });

    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export { router as postRoutes };
