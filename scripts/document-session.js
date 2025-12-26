#!/usr/bin/env node

/**
 * Development Session Documentation Generator
 * 
 * This script helps create structured development session documentation
 * following the established patterns from the ChurchTools dashboard project.
 * 
 * Usage:
 *   node scripts/document-session.js
 *   node scripts/document-session.js --interactive
 *   node scripts/document-session.js --template-only
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

function getCurrentDate() {
  const now = new Date()
  return now.toISOString().split('T')[0] // YYYY-MM-DD format
}

function getCurrentBranch() {
  try {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim()
  } catch (error) {
    return 'main'
  }
}

function getGitStats() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' })
    const modifiedFiles = status.split('\n').filter(line => line.trim()).length
    
    // Get recent commits for this session (last 10 commits)
    const commits = execSync('git log --oneline -10', { encoding: 'utf8' })
    
    return {
      modifiedFiles,
      recentCommits: commits.trim()
    }
  } catch (error) {
    return {
      modifiedFiles: 0,
      recentCommits: 'No git history available'
    }
  }
}

function createSessionDocument(sessionData) {
  const date = getCurrentDate()
  const filename = `DEVELOPMENT_SESSION_${date}.md`
  const docsDir = path.join(process.cwd(), 'docs')
  const filepath = path.join(docsDir, filename)
  
  // Ensure docs directory exists
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true })
  }
  
  // Read template
  const templatePath = path.join(process.cwd(), '.ona-session-template.md')
  let template = ''
  
  if (fs.existsSync(templatePath)) {
    template = fs.readFileSync(templatePath, 'utf8')
  } else {
    console.warn('Template not found, creating basic structure...')
    template = createBasicTemplate()
  }
  
  // Replace placeholders
  let content = template
  Object.entries(sessionData).forEach(([key, value]) => {
    const placeholder = `{{${key.toUpperCase()}}}`
    content = content.replace(new RegExp(placeholder, 'g'), value)
  })
  
  // Write file
  fs.writeFileSync(filepath, content)
  console.log(`✅ Session documentation created: ${filename}`)
  
  return filepath
}

function createBasicTemplate() {
  return `# Development Session - {{DATE}}

## Session Overview
**Duration**: {{DURATION}}  
**Branch**: {{BRANCH}}  
**Focus**: {{FOCUS}}

## Major Accomplishments

### 1. {{ACCOMPLISHMENT_1}} ✅
- **Goal**: {{GOAL_1}}
- **Result**: {{RESULT_1}}

## Technical Challenges & Solutions

### Challenge 1: {{CHALLENGE_1}}
**Problem**: {{PROBLEM_1}}
**Solution**: {{SOLUTION_1}}

## Lessons Learned

### 1. {{LESSON_1}}
- {{LESSON_DETAIL_1}}

## Commits Summary

{{COMMIT_LIST}}

---

**Session completed successfully.**`
}

async function interactiveMode() {
  console.log('🚀 Development Session Documentation Generator')
  console.log('============================================\n')
  
  const sessionData = {
    date: getCurrentDate(),
    branch: getCurrentBranch(),
    duration: await question('Session duration (e.g., "~3 hours"): '),
    focus: await question('Main focus of this session: '),
    accomplishment_1: await question('First major accomplishment: '),
    goal_1: await question('Goal for accomplishment 1: '),
    result_1: await question('Result for accomplishment 1: '),
    challenge_1: await question('Main technical challenge: '),
    problem_1: await question('Problem description: '),
    solution_1: await question('Solution implemented: '),
    lesson_1: await question('Key lesson learned: '),
    lesson_detail_1: await question('Lesson detail: ')
  }
  
  const gitStats = getGitStats()
  sessionData.commit_list = gitStats.recentCommits
  
  rl.close()
  
  return createSessionDocument(sessionData)
}

async function templateOnlyMode() {
  console.log('📝 Creating session template...')
  
  const sessionData = {
    date: getCurrentDate(),
    branch: getCurrentBranch(),
    duration: '~X hours',
    focus: '[Describe main focus of session]',
    accomplishment_1: '[First major accomplishment]',
    goal_1: '[Goal description]',
    result_1: '[Result description]',
    impact_1: '[Impact description]',
    change_1: '[Key change 1]',
    change_2: '[Key change 2]',
    change_3: '[Key change 3]',
    accomplishment_2: '[Second major accomplishment]',
    issue_2: '[Issue description]',
    solution_2: '[Solution description]',
    documentation_2: '[Documentation updates]',
    code_example: '[Code example here]',
    challenge_1: '[Challenge description]',
    error_message_1: '[Error message]',
    cause_1: '[Root cause]',
    solution_1: '[Solution implemented]',
    challenge_2: '[Second challenge]',
    problem_2: '[Problem description]',
    solution_2: '[Solution description]',
    insight_2: '[Key insight]',
    improvement_1: '[Improvement area 1]',
    detail_1: '[Detail 1]',
    detail_2: '[Detail 2]',
    detail_3: '[Detail 3]',
    improvement_2: '[Improvement area 2]',
    detail_4: '[Detail 4]',
    detail_5: '[Detail 5]',
    detail_6: '[Detail 6]',
    optimization_1: '[Optimization 1]',
    opt_detail_1: '[Optimization detail 1]',
    opt_detail_2: '[Optimization detail 2]',
    optimization_2: '[Optimization 2]',
    opt_detail_3: '[Optimization detail 3]',
    opt_detail_4: '[Optimization detail 4]',
    doc_update_1: '[Documentation update 1]',
    doc_detail_1: '[Doc detail 1]',
    doc_detail_2: '[Doc detail 2]',
    doc_update_2: '[Documentation update 2]',
    doc_detail_3: '[Doc detail 3]',
    doc_detail_4: '[Doc detail 4]',
    lesson_1: '[Lesson 1]',
    lesson_detail_1: '[Lesson detail 1]',
    lesson_detail_2: '[Lesson detail 2]',
    lesson_2: '[Lesson 2]',
    lesson_detail_3: '[Lesson detail 3]',
    lesson_detail_4: '[Lesson detail 4]',
    lesson_3: '[Lesson 3]',
    lesson_detail_5: '[Lesson detail 5]',
    lesson_detail_6: '[Lesson detail 6]',
    future_1: '[Future consideration 1]',
    future_detail_1: '[Future detail 1]',
    future_detail_2: '[Future detail 2]',
    future_2: '[Future consideration 2]',
    future_detail_3: '[Future detail 3]',
    future_detail_4: '[Future detail 4]',
    environment: '[Environment details]',
    build_notes: '[Build process notes]',
    performance_notes: '[Performance notes]',
    files_modified: '[Number of files]',
    lines_added: '[Lines added]',
    lines_removed: '[Lines removed]',
    net_change: '[Net change]',
    build_time: '[Build time]',
    breaking_changes: '[Breaking changes status]',
    completion_status: 'successfully',
    objectives_met: '[number]',
    regressions: 'no'
  }
  
  const gitStats = getGitStats()
  sessionData.commit_list = gitStats.recentCommits
  
  return createSessionDocument(sessionData)
}

async function quickMode() {
  console.log('⚡ Quick session documentation...')
  
  const sessionData = {
    date: getCurrentDate(),
    branch: getCurrentBranch(),
    duration: '~2 hours',
    focus: 'Development session',
    accomplishment_1: 'Feature implementation',
    goal_1: 'Implement new functionality',
    result_1: 'Successfully implemented',
    challenge_1: 'Technical implementation',
    problem_1: 'Implementation complexity',
    solution_1: 'Systematic approach',
    lesson_1: 'Development best practices',
    lesson_detail_1: 'Consistent patterns improve development speed'
  }
  
  const gitStats = getGitStats()
  sessionData.commit_list = gitStats.recentCommits
  
  return createSessionDocument(sessionData)
}

// Main execution
async function main() {
  const args = process.argv.slice(2)
  
  if (args.includes('--interactive')) {
    await interactiveMode()
  } else if (args.includes('--template-only')) {
    await templateOnlyMode()
  } else if (args.includes('--help')) {
    console.log(`
Development Session Documentation Generator

Usage:
  node scripts/document-session.js                 # Quick mode with defaults
  node scripts/document-session.js --interactive   # Interactive mode with prompts
  node scripts/document-session.js --template-only # Create template with placeholders
  node scripts/document-session.js --help          # Show this help

The script creates a structured development session document following
the established patterns from ChurchTools extension development.

Files created:
  docs/DEVELOPMENT_SESSION_YYYY-MM-DD.md

The documentation includes:
- Session overview and accomplishments
- Technical challenges and solutions
- Code quality improvements
- Performance optimizations
- Lessons learned
- Git commit summary
- Future considerations
`)
  } else {
    await quickMode()
  }
}

main().catch(console.error)