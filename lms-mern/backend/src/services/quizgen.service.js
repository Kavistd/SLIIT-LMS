const axios = require('axios');

class QuizGenService {
  static async generateQuizFromText(text, numQuestions = 10) {
    try {
      // This is a placeholder for AI-powered quiz generation
      // In a real implementation, you would use an AI service like OpenAI, Cohere, etc.
      
      const questions = [];
      
      // Simple keyword extraction for now
      const keywords = this.extractKeywords(text);
      
      for (let i = 0; i < numQuestions; i++) {
        const keyword = keywords[i % keywords.length];
        questions.push({
          question: `What is ${keyword}?`,
          options: [
            { text: `Definition of ${keyword}`, isCorrect: true },
            { text: `Incorrect option 1 for ${keyword}`, isCorrect: false },
            { text: `Incorrect option 2 for ${keyword}`, isCorrect: false },
            { text: `Incorrect option 3 for ${keyword}`, isCorrect: false },
          ],
          points: 1,
        });
      }
      
      return {
        title: 'Generated Quiz',
        description: 'Quiz generated from course material',
        questions,
        timeLimit: 30,
        passingScore: 70,
      };
    } catch (error) {
      throw new Error(`Failed to generate quiz: ${error.message}`);
    }
  }

  static async generateQuizFromCourse(courseId) {
    try {
      const { Material, Post } = require('../models');
      
      // Get course materials
      const materials = await Material.find({ course: courseId });
      const posts = await Post.find({ course: courseId });
      
      // Combine content
      const content = [
        ...materials.map(m => m.description || ''),
        ...posts.map(p => p.content || ''),
      ].join(' ');
      
      return await this.generateQuizFromText(content, 15);
    } catch (error) {
      throw new Error(`Failed to generate quiz from course: ${error.message}`);
    }
  }

  static extractKeywords(text) {
    // Simple keyword extraction - in reality, you'd use NLP
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    const words = text.toLowerCase().replace(/[^a-zA-Z\s]/g, '').split(/\s+/);
    
    const wordCount = {};
    words.forEach(word => {
      if (word.length > 3 && !commonWords.includes(word)) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });
    
    return Object.keys(wordCount)
      .sort((a, b) => wordCount[b] - wordCount[a])
      .slice(0, 20);
  }

  static async validateQuiz(quiz) {
    try {
      const errors = [];
      
      if (!quiz.title || quiz.title.length < 5) {
        errors.push('Quiz title must be at least 5 characters long');
      }
      
      if (!quiz.questions || quiz.questions.length === 0) {
        errors.push('Quiz must have at least one question');
      }
      
      quiz.questions.forEach((question, index) => {
        if (!question.question || question.question.length < 10) {
          errors.push(`Question ${index + 1} must be at least 10 characters long`);
        }
        
        if (!question.options || question.options.length < 2) {
          errors.push(`Question ${index + 1} must have at least 2 options`);
        }
        
        const correctOptions = question.options.filter(opt => opt.isCorrect);
        if (correctOptions.length !== 1) {
          errors.push(`Question ${index + 1} must have exactly one correct answer`);
        }
      });
      
      return {
        isValid: errors.length === 0,
        errors,
      };
    } catch (error) {
      throw new Error(`Failed to validate quiz: ${error.message}`);
    }
  }
}

module.exports = QuizGenService;