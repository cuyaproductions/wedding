'use strict';

import * as nodePath from 'path';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import nodemon from 'gulp-nodemon';

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
paths.config = 'config';

paths.views = 'views';
paths.styles = 'styles';
paths.scripts = 'scripts';
paths.images = 'images';

gulp.task('styles', () => {
  return gulp.src(resolve(paths.src, paths.styles, '*.scss'))
   .pipe(gulpIf(isDev, sourcemaps.init()))
   .pipe(sass().on('error', sass.logError))
   .pipe(gulpIf(!isDev, postcss([ autoprefixer() ])))
   .pipe(gulpIf(isDev, sourcemaps.write('.')))
   .pipe(gulp.dest(resolve(paths.dist, paths.styles)))
   .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
  return gulp.src(resolve(paths.src, paths.scripts, 'app.js'))
   .pipe(webpack(webpackConfig))
   .pipe(gulp.dest(resolve(paths.dist, paths.scripts)))
   .pipe(browserSync.reload());
});

gulp.task('dev', () => {
  let started = false;

  nodemon({
    exec: 'npm start',
    ext: 'js hbs',
    ignore: ['gulpfile.babel.js', resolve(paths.src), resolve(paths.dist)],
    task: ['default'],
  }).on('start', () => {
    if (!started) {
      browserSync.init({
        proxy: `localhost:${process.env.PORT}`,
      });

      gulp.watch(resolve(paths.src, paths.styles, '**/*.scss'), ['styles']);
      gulp.watch(resolve(paths.src, paths.scripts, '**/*.js'), ['scripts']);
      gulp.watch(resolve(paths.views, '**/*.hbs')).on('change', browserSync.reload);

      started = true;
    }
  });
});

gulp.task('default', ['styles', 'scripts']);