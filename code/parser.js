function scheduleHtmlParser(json_str) {
  courses_json = JSON.parse(json_str)
  const courseInfos = []

  for (course of courses_json) {
    const name = course.kcmc
    const position = course.cdmc
    const teacher = course.xm
    const weeksTemp = course.zcd.replace('周', '').split(',')
    const weeks = []
    weeksTemp.forEach(w => {
      let isEven = false;
      let isOdd = false;
      if (w.includes('(双)')) {
        isEven = true;
        w = w.replace('(双)', '');
      } else if (w.includes('(单)')) {
        isOdd = true;
        w = w.replace('(单)', '');
      }
      w = w.split('-')
      if (w.length === 1) {
        const week = parseInt(w)
        if (!isEven && !isOdd) {
          weeks.push(week)
        } else if (isEven && week % 2 === 0) {
          weeks.push(week)
        } else if (isOdd && week % 2 !== 0) {
          weeks.push(week)
        }
      } else {
        for (let i = parseInt(w[0]); i <= parseInt(w[1]); i += 1) {
          if (!isEven && !isOdd) {
            weeks.push(i)
          } else if (isEven && i % 2 === 0) {
            weeks.push(i)
          } else if (isOdd && i % 2 !== 0) {
            weeks.push(i)
          }
        }
      }
    })
    const day = parseInt(course.xqj)
    const sectionsTemp = course.jcs.split('-')
    const sections = []
    if (sectionsTemp.length == 1) {
      sections.push(parseInt(sectionsTemp[0]))
    } else {
      for (let i = parseInt(sectionsTemp[0]); i <= parseInt(sectionsTemp[1]); i += 1) {
        sections.push(i)
      }
    }

    courseInfos.push({
      name,
      teacher,
      position,
      weeks,
      day,
      sections,
    })
  }

  return courseInfos
}