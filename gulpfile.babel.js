'use strict';

import * as nodePath from 'path';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import webpack from 'gulp-webpack';

import webpackConfig from './webpack.config.js';
import dotevn from 'dotenv';

dotevn.config();

function resolve (...args) {
  return nodePath.resolve(__dirname, ...args);
}

const isDev = process.env.ENV === 'dev';

const paths = {};
paths.src = 'src';
paths.dist = 'dist';

paths.styles = 'styles';
paths.scripts = 'scripts';
paths.images = 'images';

gulp.task('styles', () => {
  return gulp.src(resolve(paths.src, paths.styles, '*.scss'))
   .pipe(gulpIf(isDev, sourcemaps.init()))
   .pipe(sass().on('error', sass.logError))
   .pipe(gulpIf(!isDev, postcss([ autoprefixer() ])))
   .pipe(gulpIf(isDev, sourcemaps.write('.')))
   .pipe(gulp.dest(resolve(paths.dist, paths.styles)));
});

gulp.task('scripts', () => {
  return gulp.src(resolve(paths.src, paths.scripts, 'app.js'))
   .pipe(webpack(webpackConfig))
   .pipe(gulp.dest(resolve(paths.dist, paths.scripts)));
});
