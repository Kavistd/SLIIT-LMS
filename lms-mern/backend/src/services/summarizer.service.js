const axios = require('axios');

class SummarizerService {
  static async summarizeText(text, maxLength = 300) {
    try {
      // This is a placeholder for text summarization
      // In a real implementation, you would use an AI service like OpenAI, Cohere, etc.
      
      if (text.length <= maxLength) {
        return text;
      }

      // Simple truncation for now
      const truncated = text.substring(0, maxLength);
      const lastPeriod = truncated.lastIndexOf('.');
      
      if (lastPeriod > maxLength * 0.8) {
        return truncated.substring(0, lastPeriod + 1) + '...';
      } else {
        return truncated + '...';
      }
    } catch (error) {
      throw new Error(`Failed to summarize text: ${error.message}`);
    }
  }

  static async summarizeCourseContent(courseId) {
    try {
      const { Material, Post } = require('../models');
      
      // Get all materials for the course
      const materials = await Material.find({ course: courseId });
      
      // Get all posts for the course
      const posts = await Post.find({ course: courseId });
      
      // Combine content
      const content = [
        ...materials.map(m => m.description || ''),
        ...posts.map(p => p.content || ''),
      ].join(' ');
      
      return await this.summarizeText(content, 500);
    } catch (error) {
      throw new Error(`Failed to summarize course content: ${error.message}`);
    }
  }

  static async generateStudyGuide(courseId) {
    try {
      const { Quiz, Material } = require('../models');
      
      // Get all quizzes for the course
      const quizzes = await Quiz.find({ course: courseId });
      
      // Get all materials for the course
      const materials = await Material.find({ course: courseId });
      
      const studyGuide = {
        course: courseId,
        topics: [],
        keyConcepts: [],
        practiceQuestions: [],
        resources: materials.map(m => ({
          title: m.title,
          type: m.type,
          url: m.fileUrl || m.linkUrl,
        })),
        generatedAt: new Date(),
      };
      
      // Extract topics from quiz questions
      quizzes.forEach(quiz => {
        quiz.questions.forEach(question => {
          studyGuide.practiceQuestions.push({
            question: question.question,
            options: question.options.map(opt => opt.text),
            points: question.points,
          });
        });
      });
      
      return studyGuide;
    } catch (error) {
      throw new Error(`Failed to generate study guide: ${error.message}`);
    }
  }
}

module.exports = SummarizerService;