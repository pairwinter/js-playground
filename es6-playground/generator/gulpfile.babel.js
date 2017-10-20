/**
 * @ignore  =====================================================================================
 * @file    gulpfile.babel
 * @version 1.0.0
 * @author  Damon Liu(damon.liudong@gmail.com)
 * @date    Created at 4:41 PM 18/06/2017
 * @ignore  =====================================================================================
 */
import gulp from 'gulp';
import {
    testGenerator,
    testGeneratorAjax
} from './index';

gulp.task('generator', function () {
    testGenerator();
});

gulp.task('testGeneratorAjax', function () {
    testGeneratorAjax();
});