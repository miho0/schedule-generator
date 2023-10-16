const puppeteer = require("puppeteer");

const url = "https://www.wise-tt.com/wtt_um_feri/index.jsp?filterId=0;580,414;0;0;";

const openWeekXPath = '//*[@id="form:j_idt149"]/div[3]';
const selectWeekXPath = '//*[@id="form:j_idt149_1"]';

const openProgramXPath = '//*[@id="form:j_idt177"]/div[3]';
const selecProgramXPath = '//*[@id="form:j_idt177_panel"]/div';

const startTime = 7;

const selections = [
    '1',
    '1',
    '1',
    '1'
]

const getFullSchedule = async (result) => {
    return new Promise(async (resolve, reject) => {
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
        });

        const page = await browser.newPage();

        await page.goto((url), {
            waitUntil: "domcontentloaded",
        });

        const openWeek = await page.$x(openWeekXPath);

        if (openWeek.length > 0) {
            await openWeek[0].click();
            const selectWeek = await page.$x(selectWeekXPath);

            if (selectWeek.length > 0) {
                await selectWeek[0].click();
            }
        }

        setTimeout(async () => {
            const calendarTable = await page.$('#mainCalendar')
            const schedule = await getSchedule(calendarTable);
            resolve(schedule);

            await browser.close();
        }, 2000);
    });
}

const getSchedule = async (calendarTable) => {
    let schedule = [];

    if (calendarTable) {
        const inputs = await calendarTable.$$('input');

        for (let i = 0; i < inputs.length; i++) {
            const value = await inputs[i].evaluate(element => element.getAttribute('value'));
            const id = await inputs[i].evaluate(element => element.getAttribute('id'));

            if (id && id.endsWith("Hour")) {
                if (value) {
                    const subjectWithType = await inputs[i + 2].evaluate(element => element.getAttribute('value'))
                    const groupValue = await inputs[i + 1].evaluate(element => element.getAttribute('value'))

                    const lastSpaceIndex = subjectWithType.lastIndexOf(" ");

                    const type = subjectWithType.substring(lastSpaceIndex + 1).replace(/[()]/g, '');
                    const subject = subjectWithType.slice(0, lastSpaceIndex);

                    const valueSplit = value.split(", ")
                    const timeValues = id.split(":");
                    const groupSplit = groupValue.split(" ");

                    const day = parseInt(timeValues[4]);
                    const timeIndex = timeValues[2];

                    const professor = valueSplit[0];
                    const classroom = valueSplit[1];

                    const group = groupSplit[groupSplit.length - 2] + groupSplit[groupSplit.length - 1];

                    const time = startTime + (timeIndex / 2);

                    schedule.push({
                        professor,
                        classroom,
                        type,
                        group,
                        subject,
                        day,
                        time
                    })
                }
            }
        }
    }

    return schedule;
};

const getAllRVSubjects = (schedule) => {
    let subjects = [];
    schedule.forEach((entry) => {
        if (entry.type === "RV") {
            const subject = entry.subject;
            if (!subjects.includes(subject)) {
                subjects.push(subject);
            }
        }
    })
    return subjects;
}

const generateScheduleBasedOnSelections = (schedule, subjects, selections) => {
    let toRemove = [];
    for (let i = 0; i < schedule.length; i++) {
        if (schedule[i].type === "RV") {
            const subjectIndex = subjects.indexOf(schedule[i].subject);
            if ("RV" + selections[subjectIndex] != schedule[i].group) {
                toRemove.push(i);
            }
        }
    }

    let newSchedule = JSON.parse(JSON.stringify(schedule));

    for (let i = 0; i < toRemove.length; i++) {
        newSchedule.splice(toRemove[i] - i, 1);
    }

    return newSchedule;
}

// gets all programs from the website
// TODO no longer works
const getPrograms = async () => {
    return new Promise(async (resolve, reject) => {
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
        });

        const page = await browser.newPage();

        await page.goto((url), {
            waitUntil: "domcontentloaded",
        });

        const openProgram = await page.$x(openProgramXPath);

        if (openProgram.length > 0) {
            await openProgram[0].click();
        }

        const selectProgramList = await page.$x(selecProgramXPath);
        const programLiList = await selectProgramList[0].$$('li')

        let programs = [];

        for (const program of programLiList) {
            const innerHTML = await page.evaluate(el => el.innerHTML, program);
            programs.push(innerHTML);
        }

        resolve(programs);

        await browser.close();
    });
}


// TODO
const getAllGroupsForSubjects = () => {

}

module.exports = {getFullSchedule, getPrograms}

// TODO:
// - change the subjects input format
// - group should only be added if the type is RV
// - database storing; if we already have the value, then we get it from there, otherwise we scrape it
// - transform this part into an API and create a UI
// - find a way to present to user
// - optimal group selection
