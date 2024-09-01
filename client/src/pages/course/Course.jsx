import Courses from "../../components/courses/Courses"
import Layout from "../../Layout/Layout"


function Course() {
  return (
    <Layout>
        <div className="w-[80vw] mx-auto mb-4">
        <Courses />
        </div>
    </Layout>
  )
}

export default Course