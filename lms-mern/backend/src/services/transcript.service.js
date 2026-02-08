const { Attempt, Certificate, Course } = require('../models');

class TranscriptService {
  static async generateTranscript(userId) {
    try {
      // Get all attempts for the user
      const attempts = await Attempt.find({ user: userId })
        .populate('quiz', 'title course')
        .populate('quiz.course', 'title')
        .sort({ completedAt: -1 });

      // Get all certificates for the user
      const certificates = await Certificate.find({ user: userId })
        .populate('course', 'title')
        .sort({ issuedAt: -1 });

      // Calculate statistics
      const totalQuizzes = attempts.length;
      const passedQuizzes = attempts.filter(attempt => attempt.score >= 50).length;
      const failedQuizzes = totalQuizzes - passedQuizzes;
      const averageScore = totalQuizzes > 0 
        ? attempts.reduce((sum, attempt) => sum + attempt.score, 0) / totalQuizzes 
        : 0;

      // Group by course
      const courseStats = {};
      attempts.forEach(attempt => {
        const courseId = attempt.quiz.course._id.toString();
        if (!courseStats[courseId]) {
          courseStats[courseId] = {
            course: attempt.quiz.course,
            attempts: [],
            bestScore: 0,
            passed: false,
          };
        }
        courseStats[courseId].attempts.push(attempt);
        if (attempt.score > courseStats[courseId].bestScore) {
          courseStats[courseId].bestScore = attempt.score;
          courseStats[courseId].passed = attempt.score >= 50;
        }
      });

      return {
        user: userId,
        totalQuizzes,
        passedQuizzes,
        failedQuizzes,
        averageScore: Math.round(averageScore * 100) / 100,
        certificates: certificates.length,
        courseStats: Object.values(courseStats),
        attempts,
        certificates,
        generatedAt: new Date(),
      };
    } catch (error) {
      throw new Error(`Failed to generate transcript: ${error.message}`);
    }
  }

  static async getCourseProgress(userId, courseId) {
    try {
      const course = await Course.findById(courseId);
      if (!course) {
        throw new Error('Course not found');
      }

      const attempts = await Attempt.find({ user: userId })
        .populate('quiz', 'title course')
        .populate('quiz.course', 'title');

      const courseAttempts = attempts.filter(attempt => 
        attempt.quiz.course._id.toString() === courseId
      );

      const totalQuizzes = courseAttempts.length;
      const passedQuizzes = courseAttempts.filter(attempt => attempt.score >= 50).length;
      const completionPercentage = course.quizzes ? 
        (passedQuizzes / course.quizzes.length) * 100 : 0;

      return {
        course,
        totalQuizzes,
        passedQuizzes,
        failedQuizzes: totalQuizzes - passedQuizzes,
        completionPercentage: Math.round(completionPercentage * 100) / 100,
        bestScores: courseAttempts.reduce((acc, attempt) => {
          if (!acc[attempt.quiz._id]) {
            acc[attempt.quiz._id] = attempt.score;
          } else if (attempt.score > acc[attempt.quiz._id]) {
            acc[attempt.quiz._id] = attempt.score;
          }
          return acc;
        }, {}),
      };
    } catch (error) {
      throw new Error(`Failed to get course progress: ${error.message}`);
    }
  }
}

module.exports = TranscriptService;