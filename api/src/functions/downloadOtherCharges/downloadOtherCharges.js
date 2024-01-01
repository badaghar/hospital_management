import { logger } from 'src/lib/logger'
// const puppeteer = require('puppeteer')
let chrome = {}
let puppeteer;

if (process.env.VERCEL_PUP) {
  // running on the Vercel platform.
  chrome = require('chrome-aws-lambda');
  puppeteer = require('puppeteer-core');
} else {
  // running locally.
  puppeteer = require('puppeteer');
}
/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event, _context) => {
  logger.info(
    `${event.httpMethod} ${event.path}: downloadLabChargesBill function`
  )
  const { id } = event.queryStringParameters

  async function printPDF() {
    const browser = await puppeteer.launch({ headless: true,
      executablePath: await chrome.executablePath,
    })
    const page = await browser.newPage()
    await page.goto(
      `http://${process.env.IP_ADDRESS}:8910/download-other-charges/${id}`,
      {
        waitUntil: 'networkidle0',
      }
    )
    const pdf = await page.pdf({ format: 'A4' })

    await browser.close()
    return pdf
  }

  const file = await printPDF()

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Length': file.length,
    },

    body: file,
  }
}
