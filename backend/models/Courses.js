const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const courses = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    instructor: {
      // type: Schema.Types.ObjectId,
      type: String,
      ref: "instructor",
      required: true,
    },
    totalHours: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    subtitles: [
      {
        subtitle: {
          type: String,
          required: true,
          default: "",
        },
        description: {
          type: String,
          required: true,
          default: "",
        },
        video: {
          type: String,
          default: "",
          required: true,
        },
      },
    ],
    exercises: {
      type: Array,
      default: [],
    },
    questions: [
      {
        subtitle: {
          type: String,
        },
        questions: [
          {
            question: {
              type: String,
              required: true,
            },
            answerA: {
              type: String,
              required: true,
            },
            answerB: {
              type: String,
              required: true,
            },
            answerC: {
              type: String,
              required: true,
            },
            answerD: {
              type: String,
              required: true,
            },
            correctAnswer: {
              type: String,
              enum: ["a", "b", "c", "d"],
              required: true,
            },
          },
        ],
      },
    ],

    summary: {
      type: String,
      required: [true, "Summary Required"],
      minLength: 5,
      maxLength: 500,
    },
    discount: {
      value: {
        type: Number,
        default: 0,
      },
      endDate: {
        type: String,
        default: "",
      },
    },
    image: {
      type: String,
      default: "",
    },
    prerequisite: {
      type: String,
      default: "",
    },
    views: {
      type: Number,
      default: 0,
    },
    review: {
      type: Array,
      default: [],
    },
    chat: [
      {
        sender: {
          type: String,
          default: "",
        },
        usertype: {
          type: String,
          default: "",
        },
        message: {
          type: String,
          default: "",
        },
      },
    ],
    numberOfSubscribers: {
      type: Number,
      default: 0,
    },
    preview: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Courses = mongoose.model("courses", courses);
module.exports = Courses;
