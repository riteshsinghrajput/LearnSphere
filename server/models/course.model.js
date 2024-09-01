import { model, Schema } from 'mongoose';
import categories from '../constants/categories.json' assert { type: 'json' };
const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [5, 'Title must be atleast 5 characters'],
      maxlength: [50, 'Title cannot be more than 50 characters'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [20, 'Description must be atleast 20 characters long'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
       validate : {
        validator: function(value){
          return categories?.allowedCategories.includes(value);
        },
         msg: props => `${props.value} is not a valid category. Please select from the allowed categories: ${categories.allowedCategories.join(', ')}.`
       }
    },
    lectures: [
      {
        title: String,
        description: String,
        lecture: {
          public_id: {
            type: String,
            required: true,
          },
          secure_url: {
            type: String,
            required: true,
          },
        },
      },
    ],
    thumbnail: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    numberOfLectures: {
      type: Number,
      default: 0,
    },
    createdBy: {
      name: {
        type: String,
      },
      id: {
        type: String
      }
    },
    price: {
      type: Number,
      required: [true, 'Price of course is required']
    },
    notice: {
      timeTable: {
        type: String,
      },
      message: {
        type: String
      }
    },
    duration:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);

const Course = model('Course', courseSchema);

export default Course;
