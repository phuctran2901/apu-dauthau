const BASE_URL = 'https://dauthau.asia'

import axios from 'axios'
import cheerio from 'cheerio'
// const wrapper = require('axios-cookiejar-support').wrapper
import { wrapper } from 'axios-cookiejar-support'
// const CookieJar = require('tough-cookie').CookieJar
import { CookieJar } from 'tough-cookie'

const jar = new CookieJar()

const call = axios.create({
  baseURL: BASE_URL,
  jar
})

function convertURLFromTypeInfo(typeInfo) {
  switch (Number(typeInfo)) {
    case 1:
      return 'detail'
    case 2:
      return 'listplan'
    case 7:
      return 'devprojects'
    case 3:
      return 'listresult'
    case 4:
      return 'listprequalification'
    case 5:
      return 'open'
    case 6:
      return 'listresultpq'
    default:
      return 'detail'
  }
}

function convertURLFromTypeInfo2(typeInfo) {
  switch (Number(typeInfo)) {
    case 1:
      return 'project'
    case 2:
      return 'detail'
    case 3:
      return 'listprequalification'
    case 4:
      return 'listplan'
    case 5:
      return 'listresult'
    case 6:
      return 'listresultpq'
    default:
      return 'detail'
  }
}
function convertURLFromTypeInfo3(typeInfo) {
  console.log(typeInfo)
  switch (Number(typeInfo)) {
    case 1:
      return 'dau-gia'
    case 2:
      return 'dau-gia/bidorganization'

    default:
      return 'dau-gia'
  }
}

function serialize(obj) {
  var str = []
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  return str.join('&')
}
const client = wrapper(call)
class AppControllers {
  static async getData(req, res) {
    const type = req.query.type_info
    const type2 = req.query.type_info2
    const type3 = req.query.type_info3
    const typeSearch = req.query.type_search
    let url = `/${convertURLFromTypeInfo(type)}/?${serialize(req.query)}`
    if (Number(typeSearch) === 2) {
      url = `/${convertURLFromTypeInfo2(type2)}/?${serialize(req.query)}`
    }
    if (Number(typeSearch) === 3) {
      url = `/${convertURLFromTypeInfo3(type3)}/?${serialize(req.query)}`
    }
    console.log(url)
    res.json({ url })
    // const { data } = await client.get(url)
    // try {
    //   const $ = cheerio.load(data)
    //   const listItem = $('.bidding-table tbody tr')
    //     .toArray()
    //     .map((td) => {
    //       const html = $(td)
    //       const wrapperTitle = $(html.find('.order-header'))
    //       // const titleCode = wrapperTitle.find('.bidding-code').text()
    //       const titleText = wrapperTitle.find('a').attr('title')
    //       const titleTextResult = $(html.find('.order-header > div'))
    //         .clone()
    //         .children()
    //         .remove()
    //         .end()
    //         .text()
    //       const titleLink = wrapperTitle.find('a').attr('href')
    //       const bidSolicitorWrapperTitle = wrapperTitle.next()
    //       const solicitorCode = bidSolicitorWrapperTitle
    //         .find('.solicitor-code')
    //         .text()
    //       const titleBidSolici = $(bidSolicitorWrapperTitle.find('a')).attr(
    //         'title'
    //       )
    //       const linkBidSolici = $(bidSolicitorWrapperTitle.find('a')).attr(
    //         'href'
    //       )
    //       const DMDA = $(html.find('[data-column="Đơn vị công bố DMDA"]'))
    //       const typeProject = $(html.find('[data-column="Loại dự án"]'))
    //       const nameAsset = $(html.find('[data-column="Tên tài sản"]')).find(
    //         'div a'
    //       )
    //       const assetBy = $(html.find('[data-column="Tài sản của"]')).text()
    //       const nameProject = $(html.find('[data-column="Tên dự án"]'))
    //         .find('div')
    //         .clone()
    //         .children()
    //         .remove()
    //         .end()
    //       const publicTime = $(html.find('.txt-center').first())
    //       const expired = $(publicTime).next()
    //       const packageAmount = $(publicTime).next()
    //       const KHLCNT = $(html.find('[data-column="KHLCNT"]'))
    //         .text()
    //         .replaceAll('\n', '')
    //       const wonBid = $(html.find('[data-column="Nhà thầu trúng thầu"]'))

    //       const results = $(html.find('[data-column="Kết quả chọn nhà thầu"]'))
    //       const listResult = $(html.find('[data-column="Nhà thầu được chọn"]'))
    //       const listResultUL = listResult
    //         .find('.list-bidder li')
    //         .toArray()
    //         .map((item) => {
    //           const html = $(item)
    //             .find('a')
    //             .clone()
    //             .children()
    //             .remove()
    //             .end()
    //             .text()
    //           return html
    //         })
    //       return {
    //         package: {
    //           title: {
    //             // code: titleCode,
    //             text: Number(type) === 3 ? titleTextResult : titleText,
    //             link: titleLink
    //           }
    //         },
    //         publicTime: publicTime.text(),
    //         results: `${
    //           results.text().replace('Xem chi tiết kết quả', '').split('-')[1]
    //         } </br>${
    //           results.text().replace('Xem chi tiết kết quả', '').split('-')[2]
    //         }`,
    //         nameAsset: nameAsset.text(),
    //         expired: expired.text(),
    //         wonBid: wonBid.find('li').text(),
    //         packageAmount: packageAmount.text(),
    //         assetBy,
    //         KHLCNT,
    //         DMDA: DMDA.text(),
    //         listResult: listResultUL,
    //         bidSolicitor: {
    //           title: titleBidSolici,
    //           code: solicitorCode,
    //           link: linkBidSolici
    //         },
    //         typeProject: typeProject.text(),
    //         nameProject: nameProject.text()
    //       }
    //     })
    //   const pagination = $('.pagination li').toArray()
    //   res.json({
    //     data: listItem,
    //     totalCount: listItem.length,
    //     totalPage: $(pagination[pagination.length - 2]).text()
    //   })
    // } catch (err) {
    //   console.log(err.message)
    // }
  }

  static async getDetail(req, res) {
    const url = req.body.url
    const { data } = await client.get(url)
    try {
      const $ = cheerio.load(data)
      const titlePackage = $('.tl.wrap__text').text()
      const applicationDeadline = $('.btn.btn-dayleft').text().trim()
      const ttchsmt = $('#ttchsmt')
      const wrapperDetail = ttchsmt.find('.bidding-detail')

      const item1 = wrapperDetail.find('.bidding-detail-item').first()
      const publicTime = item1.children().last().find('.c-val').text()

      const item2 = item1.next().next()
      const statusPakage = item2.find('div').first().find('.c-val').text()
      const areasOfExpertise = item2.find('div').last().text()

      const item3 = item2.next()
      const projectName = item3.find('.c-val').text()

      const item4 = item3.next()
      const packageName = item4.find('.c-val').text()

      const item5 = item4.next()
      const bidSolicitor = item5.find('a').attr('title')

      const item6 = item5.next()
      const investor = item6.find('a').attr('title')

      const item7 = item6.next().next().next()
      const capital = item7.find('.c-val').text()

      const item8 = item7.next()
      const limit = item8.find('.c-val').text()

      const item9 = item8.next()
      const method = item9.find('.c-val').text()

      const item10 = item9.next()
      const typeOfContract = item10.find('.c-val').text()

      const item11 = item10.next().next().next()
      const doneAt = item11.find('.c-val').text()

      const item12 = item11.next().next().next()
      const effectiveTime = item12.find('.c-val').text()

      const item13 = item12.next().next()
      const approvalDecisionNumber = item13.find('.c-val').text()

      const item14 = item13.next()
      const approvalDate = item14.find('.c-val').text()

      const item15 = item14.next()
      const approvalAuthority = item15.find('.c-val').text()

      const tdt = $('#tdt')
      const wrapperTDT = tdt.find('.bidding-detail')
      const item21 = wrapperTDT.find('.bidding-detail-item').first()
      const formality = item21.find('.c-val').text()

      const item22 = item21.next()
      const receivedDate = {
        from: item22.children().first().find('.c-val').text(),
        to: item22.children().last().find('.c-val').text()
      }

      const item23 = item22.next()
      const expense = item23.find('.c-val').text()

      const item24 = item23.next()
      const recipients = item24.find('#dia_diem_nhan_hsdt').text()
      res.json({
        detail: {
          titlePackage,
          applicationDeadline,
          publicTime,
          statusPakage,
          areasOfExpertise,
          projectName,
          packageName,
          bidSolicitor,
          investor,
          capital,
          limit,
          method,
          typeOfContract,
          doneAt,
          effectiveTime,
          approvalDecisionNumber,
          approvalDate,
          approvalAuthority
        },
        tdt: {
          formality,
          receivedDate,
          expense
          // recipients
        }
      })
    } catch (err) {
      console.log(err.message)
    }
  }

  static async getProcuringEntity(req, res) {
    const url = req.body.url
    const { data } = await client.get(url)
    try {
      const $ = cheerio.load(data)
      const wrapper = $('.bidding-detail')
      const listItem = wrapper.find('.bidding-detail-item').length
      const item1 =
        listItem <= 20
          ? wrapper.find('.bidding-detail-item').first().next()
          : wrapper.find('.bidding-detail-item').first().next().next()
      const agencyCode = item1.find('.c-val').text()

      const item2 = item1.next().next().next().next()
      const subclasses = item2.children().first().find('.c-val').text()
      const typeOfAgency = item2.children().last().find('.c-val').text()

      const item3 = item2.next()
      const province = item3.find('.c-val').text()

      const item4 = item3.next()
      const address = item4.find('.c-val').text()

      const item5 = item4.next()
      const phone = item5.find('.c-val').first().text()

      const item6 = item5.nextAll().slice(5, 6)
      const agency = item6.find('.c-val').text()

      const item7 = item6.nextAll().slice(1, 2)
      const representative = item7.find('.c-val').text()

      res.json({
        agencyCode,
        subclasses,
        typeOfAgency,
        province,
        address,
        phone,
        agency,
        representative
      })
    } catch (err) {
      console.log(err.message)
    }
  }
}
export default AppControllers
