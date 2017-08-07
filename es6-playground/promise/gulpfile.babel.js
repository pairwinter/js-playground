/**
 * @ignore  =====================================================================================
 * @file    gulpfile.babel
 * @version 1.0.0
 * @author  Damon Liu(damon.liudong@gmail.com)
 * @date    Created at 3:49 PM 18/06/2017
 * @ignore  =====================================================================================
 */

import gulp from 'gulp';
import {
    testPromise
} from './index';

gulp.task('test-es6', function () {
    testPromise();
})
