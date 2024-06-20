#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

class Student {
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 500;
    }

    enrollCourse(course: string) {
        this.courses.push(course);
    }

    viewBalance() {
        console.log(chalk.bold.green(`\n \t Balance for ${this.name}: $${this.balance} \n`));
    }

    payFees(amount: number) {
        this.balance -= amount;
        console.log(chalk.bold.green(`\n \t $${amount} paid successfully for ${this.name}\n`));
        console.log(chalk.bold.green(`\n \t Remaining Balance: $${this.balance}\n`));
    }

    showStatus() {
        console.log(chalk.bold.magentaBright(`ID: ${this.id}`));
        console.log(chalk.bold.magentaBright(`Name: ${this.name}`));
        console.log(chalk.bold.magentaBright(`Courses: ${this.courses.join(", ")}`));
        console.log(chalk.bold.magentaBright(`Balance: ${this.balance}`));
    }
}

class StudentManager {
    students: Student[];

    constructor() {
        this.students = [];
    }

    addStudent(name: string) {
        const student = new Student(name);
        this.students.push(student);
        console.log(chalk.bold.green(`\n \t Student: ${name} added successfully. Student ID: ${student.id}\n`));
    }

    enrollStudent(studentId: number, course: string) {
        const student = this.findStudent(studentId);
        if (student) {
            student.enrollCourse(course);
            console.log(chalk.bold.green(`\n \t ${student.name} enrolled in ${course} successfully \n`));
        } else {
            console.log(chalk.bold.red("\n \t Student not found. Please enter a correct student ID.\n"));
        }
    }

    viewStudentBalance(studentId: number) {
        const student = this.findStudent(studentId);
        if (student) {
            student.viewBalance();
        } else {
            console.log(chalk.bold.red("\n \t Student not found. Please enter a correct student ID.\n"));
        }
    }

    payStudentFees(studentId: number, amount: number) {
        const student = this.findStudent(studentId);
        if (student) {
            student.payFees(amount);
        } else {
            console.log(chalk.bold.red("\n \t Student not found. Please enter a correct student ID.\n"));
        }
    }

    showStudentStatus(studentId: number) {
        const student = this.findStudent(studentId);
        if (student) {
            student.showStatus();
        } else {
            console.log(chalk.bold.red("\n \t Student not found. Please enter a correct student ID.\n"));
        }
    }

    findStudent(studentId: number) {
        return this.students.find(student => student.id === studentId);
    }
}

async function main() {
    console.log(chalk.bold.italic.cyan("\n \t* wellcome to 'CodeWithDua' - Student Management System *\n"));

    const sms = new StudentManager();

    while (true) {
        const choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: (chalk.bgBlue("Select an option:")),
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);

        switch (choice.choice) {
            case "Add Student":
                const nameInput = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: (chalk.magenta("Enter a student name:"))
                    }
                ]);
                sms.addStudent(nameInput.name);
                break;

            case "Enroll Student":
                const courseInput = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: (chalk.magenta("Enter a student ID:"))
                    },
                    {
                        name: "course",
                        type: "input",
                        message: (chalk.magenta("Enter a course name:"))
                    }
                ]);
                sms.enrollStudent(courseInput.student_id, courseInput.course);
                break;

            case "View Student Balance":
                const balanceInput = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: (chalk.magenta("Enter a student ID:"))
                    }
                ]);
                sms.viewStudentBalance(balanceInput.student_id);
                break;

            case "Pay Fees":
                const feesInput = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: (chalk.magenta("Enter a student ID:"))
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: (chalk.magenta("Enter the amount to pay:"))
                    }
                ]);
                sms.payStudentFees(feesInput.student_id, feesInput.amount);
                break;

            case "Show Status":
                const statusInput = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: (chalk.magenta("Enter a student ID:"))
                    }
                ]);
                 sms.showStudentStatus(statusInput.student_id);
                break;

            case "Exit":
                console.log(chalk.cyan("Exiting..."));
                process.exit();
        }
    }
}

main();